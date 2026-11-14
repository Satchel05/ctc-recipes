CREATE TABLE recipe_ingredients (
  recipe_id      INTEGER       NOT NULL REFERENCES recipes (id) ON DELETE CASCADE,
  ingredient_id  INTEGER       NOT NULL REFERENCES ingredients (id),
  position       INTEGER       NOT NULL,
  quantity       NUMERIC(8, 2) NOT NULL,
  unit           TEXT          NOT NULL,
  preparation    TEXT,
  PRIMARY KEY (recipe_id, ingredient_id)
);
