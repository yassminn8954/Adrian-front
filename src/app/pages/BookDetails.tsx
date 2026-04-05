import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Edit2, Trash2, BookOpen } from 'lucide-react';
import type { Book, BookCategory } from '../types/book';
import { RatingStars } from '../components/RatingStars';

const categoryLabels: Record<string, string> = {
  'lidos': 'Lidos',
  'comprados': 'Comprados',
  'querendo-ler': 'Querendo Ler',
  'interessantes': 'Interessantes',
  'nao-gostei': 'Não Gostei',
  'biblioteca-particular': 'Biblioteca Particular',
};

const categoryColors: Record<string, string> = {
  'lidos': 'bg-green-100 text-green-800',
  'comprados': 'bg-blue-100 text-blue-800',
  'querendo-ler': 'bg-purple-100 text-purple-800',
  'interessantes': 'bg-yellow-100 text-yellow-800',
  'nao-gostei': 'bg-red-100 text-red-800',
  'biblioteca-particular': 'bg-indigo-100 text-indigo-800',
};

export function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Book>>({});

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const foundBook = books.find((b: Book) => b.id === id);
    if (foundBook) {
      setBook(foundBook);
      setEditData(foundBook);
    }
  }, [id]);

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      const updatedBooks = books.filter((b: Book) => b.id !== id);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      navigate('/');
    }
  };

  const handleSave = () => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const updatedBooks = books.map((b: Book) => 
      b.id === id ? { ...b, ...editData } : b
    );
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBook({ ...book!, ...editData });
    setIsEditing(false);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Livro não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Voltar para biblioteca
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100">
              {book.capa ? (
                <img
                  src={book.capa}
                  alt={book.titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center">
                  <BookOpen size={96} className="text-gray-400" />
                </div>
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.titulo}
                      onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                      className="text-3xl font-bold mb-2 w-full border rounded px-2 py-1"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold mb-2">{book.titulo}</h1>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.autor}
                      onChange={(e) => setEditData({ ...editData, autor: e.target.value })}
                      className="text-xl text-gray-600 w-full border rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-xl text-gray-600">{book.autor}</p>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {!isEditing && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                {isEditing ? (
                  <select
                    value={editData.categoria}
                    onChange={(e) => setEditData({ ...editData, categoria: e.target.value as BookCategory })}
                    className="px-3 py-1 rounded-full border"
                  >
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${categoryColors[book.categoria]}`}>
                    {categoryLabels[book.categoria]}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Sinopse</h2>
                {isEditing ? (
                  <textarea
                    value={editData.sinopse}
                    onChange={(e) => setEditData({ ...editData, sinopse: e.target.value })}
                    rows={5}
                    className="w-full border rounded px-3 py-2 text-gray-700 leading-relaxed"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{book.sinopse}</p>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Minha Avaliação</h2>
                <RatingStars
                  rating={isEditing ? (editData.minhaAvaliacao || 0) : (book.minhaAvaliacao || 0)}
                  onChange={isEditing ? (rating) => setEditData({ ...editData, minhaAvaliacao: rating }) : undefined}
                  readonly={!isEditing}
                  size={24}
                />
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Minha Resenha</h2>
                {isEditing ? (
                  <textarea
                    value={editData.minhaResenha || ''}
                    onChange={(e) => setEditData({ ...editData, minhaResenha: e.target.value })}
                    rows={4}
                    className="w-full border rounded px-3 py-2 text-gray-700"
                    placeholder="Adicione sua resenha aqui..."
                  />
                ) : (
                  <p className="text-gray-700 italic">
                    {book.minhaResenha || 'Nenhuma resenha adicionada ainda.'}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(book);
                    }}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t text-sm text-gray-500">
                Adicionado em {new Date(book.dataAdicao).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
