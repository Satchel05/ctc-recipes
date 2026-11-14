export default function DishCarousel({ recipes }) {
  if (recipes.length === 0) {
    return <p className="empty-message">No recipes for this cuisine yet.</p>
  }

  return (
    <div
      className="dish-carousel"
      tabIndex={0}
      aria-label="Recipe cards"
    >
      {recipes.map((recipe) => (
        <article className="dish-card" key={recipe.id}>
          <img
            className="dish-image"
            src={recipe.image_url}
            alt={recipe.title}
          />

          <div className="dish-info">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>

            <div className="dish-badges">
              <span className="badge difficulty">
                {recipe.difficulty}
              </span>

              <span className="badge rating">
                ★ {recipe.rating}
              </span>

              <span className="badge duration">
                {recipe.prep_minutes + recipe.cook_minutes} min
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}