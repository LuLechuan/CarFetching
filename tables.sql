DROP DATABASE IF EXISTS ourdatabase;
CREATE DATABASE ourdatabase;

DROP TABLE IF EXISTS drivers;
CREATE TABLE drivers (
  ID VARCHAR(128) PRIMARY KEY,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(64) NOT NULL,
  age INTEGER NOT NULL check(age >= 21 AND age <= 70),
  sex VARCHAR(8) NOT NULL check(sex = 'male' OR sex = 'female')
);

DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
  ID CHAR(8) PRIMARY KEY,
  driver VARCHAR(128),
  capacity INT NOT NULL,
  model VARCHAR(64),
  FOREIGN KEY (driver) REFERENCES drivers(ID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS rides;
CREATE TABLE rides (
  ID VARCHAR(64) PRIMARY KEY,
  car CHAR(8),
  start_time TIMESTAMP NOT NULL,
  source VARCHAR(128) NOT NULL,
  destination VARCHAR(128) NOT NULL,
  capacity INT NOT NULL,
  number_passenger INT,
  status VARCHAR(8) NOT NULL CHECK(status = 'pending' OR status = 'success' OR status = 'failed'),
  CHECK (source <> destination),
  CHECK (number_passenger >= 0 AND number_passenger <= capacity),
  FOREIGN KEY (car, capacity) REFERENCES cars(ID, capacity)
);

DROP TABLE IF EXISTS bids;
CREATE TABLE bids (
  passenger VARCHAR(128),
  ride VARCHAR(64),
  amount FLOAT NOT NULL CHECK (amount >= 0),
  status VARCHAR(8) NOT NULL CHECK(status = 'pending' OR status = 'success' OR status = 'failed'),
  PRIMARY KEY (passenger, ride),
  FOREIGN KEY (passenger) REFERENCES passengers(ID) ON DELETE CASCADE,
  FOREIGN KEY (ride) REFERENCES rides(ID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS passengers;
CREATE TABLE passengers(
  ID VARCHAR(128) PRIMARY KEY,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(64) NOT NULL,
  age INTEGER NOT NULL,
  sex VARCHAR(8) NOT NULL check(sex = 'male' OR sex = 'female')
);
