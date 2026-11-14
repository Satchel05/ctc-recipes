CREATE TABLE recipes (
  id                    SERIAL  PRIMARY KEY,
  title                 TEXT    NOT NULL,
  slug                  TEXT    NOT NULL UNIQUE,
  description           TEXT    NOT NULL,
  cuisine_id            INTEGER NOT NULL REFERENCES cuisines (id),
  category_id           INTEGER NOT NULL REFERENCES recipe_categories (id),
  difficulty            TEXT    NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  prep_minutes          INTEGER NOT NULL CHECK (prep_minutes >= 0),
  cook_minutes          INTEGER NOT NULL CHECK (cook_minutes >= 0),
  servings              INTEGER NOT NULL CHECK (servings > 0),
  calories_per_serving  INTEGER,
  image_url             TEXT    NOT NULL,
  image_credit          TEXT,
  image_credit_url      TEXT
);

CREATE INDEX idx_recipes_category ON recipes (category_id);
CREATE INDEX idx_recipes_cuisine  ON recipes (cuisine_id);
