CREATE TABLE recipe_categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT   NOT NULL UNIQUE
);
