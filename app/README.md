# app

- `client/` — React 19 + Vite + Chakra UI + Tailwind v4
- `server/` — Express 5 + PostgreSQL

## Getting started

```bash
pnpm install
pnpm dev
```

Server DB credentials go in `server/.env`

## API (read-only)

| Endpoint                           | Description                                                   |
| ---------------------------------- | ------------------------------------------------------------- |
| `GET /api/health`                  | Health check, returns `{ "ok": true }`                        |
| `GET /api/recipes`                 | All recipes (with nested cuisine + category), sorted by title |
| `GET /api/recipes?category=dinner` | Only recipes in that category (category name, any case)       |
| `GET /api/recipes/:id`             | One recipe by id                                              |
| `GET /api/cuisines`                | All cuisines, sorted by name                                  |
| `GET /api/cuisines/:id`            | One cuisine by id                                             |
| `GET /api/categories`              | All recipe categories, sorted by name                         |
| `GET /api/categories/:id`          | One category by id                                            |
| `GET /api/ingredients`             | All ingredients, sorted by name                               |
| `GET /api/ingredients/:id`         | One ingredient by id                                          |

Each recipe looks like:

```json
{
  "id": 1,
  "title": "Spaghetti Aglio e Olio",
  "slug": "spaghetti-aglio-e-olio",
  "description": "Garlic, olive oil and chili tossed through spaghetti.",
  "difficulty": "easy",
  "prep_minutes": 5,
  "cook_minutes": 15,
  "servings": 2,
  "calories_per_serving": 520,
  "image_url": "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&h=600&fit=crop&crop=entropy&q=80&auto=format",
  "image_credit": "Photo from Unsplash",
  "image_credit_url": "https://unsplash.com/photos/spaghetti-on-white-ceramic-plate-sA3wymYqyaI",
  "cuisine": {
    "id": 6,
    "name": "Italian"
  },
  "category": {
    "id": 3,
    "name": "Dinner"
  }
}
```
