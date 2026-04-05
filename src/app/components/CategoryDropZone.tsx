import { useDrop } from 'react-dnd';
import type { Book, BookCategory } from '../types/book';

interface CategoryDropZoneProps {
  category: BookCategory;
  label: string;
  icon: string;
  count: number;
  onDrop: (book: Book, category: BookCategory) => void;
  isActive: boolean;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  'lidos': 'border-green-500 bg-green-50',
  'comprados': 'border-blue-500 bg-blue-50',
  'querendo-ler': 'border-purple-500 bg-purple-50',
  'interessantes': 'border-yellow-500 bg-yellow-50',
  'nao-gostei': 'border-red-500 bg-red-50',
  'biblioteca-particular': 'border-indigo-500 bg-indigo-50',
};

export function CategoryDropZone({ 
  category, 
  label, 
  icon, 
  count,
  onDrop,
  isActive,
  onClick 
}: CategoryDropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'BOOK',
    drop: (item: { book: Book }) => {
      onDrop(item.book, category);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isHighlighted = isOver && canDrop;

  return (
    <div
      ref={drop}
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
        isHighlighted
          ? `${categoryColors[category]} border-dashed scale-105`
          : isActive
          ? `${categoryColors[category]} border-solid`
          : 'border-gray-200 bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <div className="font-medium text-sm">{label}</div>
            <div className="text-xs text-gray-500">{count} livros</div>
          </div>
        </div>
        {isHighlighted && (
          <div className="text-xs font-medium text-gray-600">Soltar aqui</div>
        )}
      </div>
    </div>
  );
}
