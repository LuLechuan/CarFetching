DROP DATABASE IF EXISTS ourdatabase;
CREATE DATABASE ourdatabase;

CREATE TABLE drivers (
  ID VARCHAR(64) PRIMARY KEY,
  name VARCHAR(64),
  age INTEGER,
  sex VARCHAR(8),
  carNumber VARCHAR(16)
);

INSERT INTO drivers (id, name, age, sex, carNumber)
  VALUES ('21', 'Ahchuang', 22, 'male', 'D123');
