// Small colored circle showing the 0-5 rating, matching the wireframe
// (red for low ratings, orange for mid, green for high).
function ratingColorClasses(rating) {
  if (rating <= 2) return 'bg-red-500';
  if (rating === 3) return 'bg-amber-500';
  return 'bg-green-500';
}

export default function RatingBadge({ rating }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${ratingColorClasses(
        rating
      )}`}
      aria-label={`Rating ${rating} out of 5`}
    >
      {rating}
    </div>
  );
}
