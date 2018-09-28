DROP DATABASE IF EXISTS ourdatabase;
CREATE DATABASE ourdatabase;

CREATE TABLE drivers (
  ID INTEGER PRIMARY KEY,
  name VARCHAR(64),
  age INTEGER,
  sex VARCHAR(8),
  carNumber VARCHAR(16)
);

INSERT INTO drivers (id, name, age, sex, carNumber)
  VALUES ('2', 'Ahchuang2', 22, 'male', 'D123');
