import { useState } from 'react';
import { X } from 'lucide-react';
import type { Book, BookCategory } from '../types/book';
import { RatingStars } from './RatingStars';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: Omit<Book, 'id' | 'dataAdicao'>) => void;
}

const categories: { value: BookCategory; label: string }[] = [
  { value: 'lidos', label: 'Lidos' },
  { value: 'comprados', label: 'Comprados' },
  { value: 'querendo-ler', label: 'Querendo Ler' },
  { value: 'interessantes', label: 'Interessantes' },
  { value: 'nao-gostei', label: 'Não Gostei' },
  { value: 'biblioteca-particular', label: 'Biblioteca Particular' },
];

export function AddBookModal({ isOpen, onClose, onAdd }: AddBookModalProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    capa: '',
    sinopse: '',
    categoria: 'querendo-ler' as BookCategory,
    minhaAvaliacao: 0,
    minhaResenha: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      minhaAvaliacao: formData.minhaAvaliacao > 0 ? formData.minhaAvaliacao : undefined,
      minhaResenha: formData.minhaResenha || undefined,
    });
    setFormData({
      titulo: '',
      autor: '',
      capa: '',
      sinopse: '',
      categoria: 'querendo-ler',
      minhaAvaliacao: 0,
      minhaResenha: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Adicionar Livro</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: O Senhor dos Anéis"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Autor *
            </label>
            <input
              type="text"
              required
              value={formData.autor}
              onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: J.R.R. Tolkien"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              URL da Capa
            </label>
            <input
              type="url"
              value={formData.capa}
              onChange={(e) => setFormData({ ...formData, capa: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://exemplo.com/capa.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Sinopse *
            </label>
            <textarea
              required
              rows={4}
              value={formData.sinopse}
              onChange={(e) => setFormData({ ...formData, sinopse: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva o livro..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Categoria *
            </label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value as BookCategory })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Minha Avaliação
            </label>
            <RatingStars
              rating={formData.minhaAvaliacao}
              onChange={(rating) => setFormData({ ...formData, minhaAvaliacao: rating })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Minha Resenha
            </label>
            <textarea
              rows={3}
              value={formData.minhaResenha}
              onChange={(e) => setFormData({ ...formData, minhaResenha: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="O que você achou deste livro?"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Adicionar Livro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
