import { useDrag } from 'react-dnd';
import { Link } from 'react-router';
import type { Book } from '../types/book';
import { RatingStars } from './RatingStars';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

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

export function BookCard({ book }: BookCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOOK',
    item: { book },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`group ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ cursor: 'move' }}
    >
      <Link to={`/book/${book.id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105">
          <div className="aspect-[2/3] relative overflow-hidden bg-gray-100">
            {book.capa ? (
              <img
                src={book.capa}
                alt={book.titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen size={64} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {book.titulo}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{book.autor}</p>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[book.categoria]}`}>
                {categoryLabels[book.categoria]}
              </span>
              {book.minhaAvaliacao && (
                <RatingStars rating={book.minhaAvaliacao} size={16} readonly />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
