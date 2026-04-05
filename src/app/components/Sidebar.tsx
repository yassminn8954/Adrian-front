import type { Book, BookCategory } from '../types/book';
import { CategoryDropZone } from './CategoryDropZone';
import { Library, X } from 'lucide-react';

interface SidebarProps {
  books: Book[];
  selectedCategory: BookCategory | 'todos';
  onCategoryChange: (category: BookCategory | 'todos') => void;
  onDropBook: (book: Book, category: BookCategory) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: 'lidos' as BookCategory, label: 'Lidos', icon: '✅' },
  { value: 'comprados' as BookCategory, label: 'Comprados', icon: '🛒' },
  { value: 'querendo-ler' as BookCategory, label: 'Querendo Ler', icon: '📖' },
  { value: 'interessantes' as BookCategory, label: 'Interessantes', icon: '⭐' },
  { value: 'nao-gostei' as BookCategory, label: 'Não Gostei', icon: '👎' },
  { value: 'biblioteca-particular' as BookCategory, label: 'Biblioteca Particular', icon: '🏛️' },
];

export function Sidebar({ 
  books, 
  selectedCategory, 
  onCategoryChange, 
  onDropBook,
  isOpen,
  onClose 
}: SidebarProps) {
  const getCategoryCount = (category: BookCategory) => {
    return books.filter(b => b.categoria === category).length;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-80 bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Library size={24} />
              <h2 className="text-xl font-bold">Categorias</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-white/20 rounded"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-blue-100">
            Arraste os livros para as categorias
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <button
            onClick={() => onCategoryChange('todos')}
            className={`w-full p-4 rounded-lg border-2 mb-4 transition-all ${
              selectedCategory === 'todos'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div className="text-left">
                  <div className="font-medium text-sm">Todos</div>
                  <div className="text-xs text-gray-500">{books.length} livros</div>
                </div>
              </div>
            </div>
          </button>

          <div className="space-y-3">
            {categories.map((category) => (
              <CategoryDropZone
                key={category.value}
                category={category.value}
                label={category.label}
                icon={category.icon}
                count={getCategoryCount(category.value)}
                onDrop={onDropBook}
                isActive={selectedCategory === category.value}
                onClick={() => onCategoryChange(category.value)}
              />
            ))}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 text-xs text-gray-600">
          💡 Dica: Arraste e solte os livros nas categorias para organizá-los
        </div>
      </aside>
    </>
  );
}
