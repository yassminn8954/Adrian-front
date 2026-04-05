import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plus, Search, Library, Menu } from 'lucide-react';
import type { Book, BookCategory } from '../types/book';
import { BookCard } from '../components/BookCard';
import { AddBookModal } from '../components/AddBookModal';
import { Sidebar } from '../components/Sidebar';
import { mockBooks } from '../lib/mockBooks';

export function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      localStorage.setItem('books', JSON.stringify(mockBooks));
      setBooks(mockBooks);
    }
  }, []);

  const handleAddBook = (newBook: Omit<Book, 'id' | 'dataAdicao'>) => {
    const book: Book = {
      ...newBook,
      id: Date.now().toString(),
      dataAdicao: new Date().toISOString(),
    };
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleDropBook = (book: Book, newCategory: BookCategory) => {
    if (book.categoria === newCategory) return;
    
    const updatedBooks = books.map(b => 
      b.id === book.id ? { ...b, categoria: newCategory } : b
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'todos' || book.categoria === selectedCategory;
    const matchesSearch = 
      book.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bookStats = {
    total: books.length,
    lidos: books.filter(b => b.categoria === 'lidos').length,
    querendo: books.filter(b => b.categoria === 'querendo-ler').length,
    comprados: books.filter(b => b.categoria === 'comprados').length,
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar 
          books={books}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onDropBook={handleDropBook}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Menu size={24} />
                </button>
                <Library size={40} />
                <h1 className="text-4xl font-bold">Minha Biblioteca</h1>
              </div>
              <p className="text-blue-100">Organize, avalie e acompanhe seus livros</p>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600">{bookStats.total}</div>
                <div className="text-gray-600 text-sm">Total de Livros</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-green-600">{bookStats.lidos}</div>
                <div className="text-gray-600 text-sm">Livros Lidos</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-purple-600">{bookStats.querendo}</div>
                <div className="text-gray-600 text-sm">Querendo Ler</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600">{bookStats.comprados}</div>
                <div className="text-gray-600 text-sm">Comprados</div>
              </div>
            </div>

            {/* Search and Add */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por título ou autor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                Adicionar Livro
              </button>
            </div>

            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <Library size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg mb-2">Nenhum livro encontrado</p>
                <p className="text-gray-500 text-sm">
                  {searchQuery || selectedCategory !== 'todos' 
                    ? 'Tente ajustar os filtros de busca' 
                    : 'Adicione seu primeiro livro à biblioteca'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>

          <AddBookModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddBook}
          />
        </div>
      </div>
    </DndProvider>
  );
}