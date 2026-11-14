// Shared SELECT for recipes: joins cuisine + category so each recipe
// comes back with its related data nested inside it.
// (recipes has no NUMERIC columns, so no ::float8 casts are needed here.)
export const RECIPE_SELECT = `
  SELECT
    r.id, r.title, r.slug, r.description, r.difficulty,
    r.prep_minutes, r.cook_minutes, r.servings, r.calories_per_serving,
    r.image_url, r.image_credit, r.image_credit_url,
    json_build_object('id', cu.id, 'name', cu.name) AS cuisine,
    json_build_object('id', c.id, 'name', c.name) AS category
  FROM recipes r
  JOIN cuisines cu         ON cu.id = r.cuisine_id
  JOIN recipe_categories c ON c.id = r.category_id
`
