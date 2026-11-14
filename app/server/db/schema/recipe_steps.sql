CREATE TABLE recipe_steps (
  recipe_id    INTEGER NOT NULL REFERENCES recipes (id) ON DELETE CASCADE,
  step_number  INTEGER NOT NULL,
  instruction  TEXT    NOT NULL,
  PRIMARY KEY (recipe_id, step_number)
);
