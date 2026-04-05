import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = 20,
  onChange,
  readonly = false 
}: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => !readonly && onChange?.(starValue)}
            disabled={readonly}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              size={size}
              className={isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          </button>
        );
      })}
    </div>
  );
}
