const cuisines = [
  'Japanese',
  'Chinese',
  'Korean',
  'Vietnamese',
  'Indian',
  'French',
]

export default function CuisineCarousel({ selectedCuisine, onSelect }) {
  return (
    <div className="cuisine-carousel" aria-label="Choose a cuisine">
      {cuisines.map((cuisine) => (
        <button
          key={cuisine}
          type="button"
          className={`cuisine-button ${
            selectedCuisine === cuisine ? 'selected' : ''
          }`}
          aria-pressed={selectedCuisine === cuisine}
          onClick={() => onSelect(cuisine)}
        >
          {cuisine}
        </button>
      ))}
    </div>
  )
}