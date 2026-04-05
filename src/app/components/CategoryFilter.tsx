import type { BookCategory } from '../types/book';

interface CategoryFilterProps {
  selectedCategory: BookCategory | 'todos';
  onCategoryChange: (category: BookCategory | 'todos') => void;
}

const categories = [
  { value: 'todos', label: 'Todos', icon: '📚' },
  { value: 'lidos', label: 'Lidos', icon: '✅' },
  { value: 'comprados', label: 'Comprados', icon: '🛒' },
  { value: 'querendo-ler', label: 'Querendo Ler', icon: '📖' },
  { value: 'interessantes', label: 'Interessantes', icon: '⭐' },
  { value: 'nao-gostei', label: 'Não Gostei', icon: '👎' },
  { value: 'biblioteca-particular', label: 'Biblioteca Particular', icon: '🏛️' },
] as const;

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <h2 className="font-semibold mb-4">Categorias</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value as BookCategory | 'todos')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
