DROP DATABASE IF EXISTS ourdatabase;
CREATE DATABASE ourdatabase;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  username VARCHAR(128) PRIMARY KEY,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(64) NOT NULL,
  age INTEGER NOT NULL,
  sex VARCHAR(8) NOT NULL check(sex = 'male' OR sex = 'female'),
  role VARCHAR(10) NOT NULL check(role = 'admin' OR role = 'driver' OR role = 'passenger')
);

-- INSERT INTO users (username, password, name, age, sex, role)
-- VALUES ("Ahchuang", "123456", "LC", 23, "male", "driver");
--
-- INSERT INTO users u (u.username, u.password, u.name, u.age, u.sex, u.role)
-- VALUES ("Samuel", "654321", "SL", 17, "male", "passenger");

DROP TABLE IF EXISTS cars CASCADE;
CREATE TABLE cars (
  plate_number CHAR(8) PRIMARY KEY,
  driver VARCHAR(128),
  capacity INT NOT NULL,
  model VARCHAR(64),
  FOREIGN KEY (driver) REFERENCES users(username) ON DELETE CASCADE
);

-- INSERT INTO cars values ("A012324M", "Ahchuang", "6", "Toyota");

DROP TABLE IF EXISTS rides CASCADE;
CREATE TABLE rides (
  car CHAR(8),
  start_time TIMESTAMP,
  source VARCHAR(128),
  destination VARCHAR(128),
  number_passenger INT,
  status VARCHAR(8) NOT NULL CHECK(status = 'pending' OR status = 'success' OR status = 'failed'),
  PRIMARY KEY (car, start_time, source, destination),
  CHECK (source <> destination),
  FOREIGN KEY (car) REFERENCES cars(plate_number)
);

-- INSERT INTO rides values ("A012324M", "2017-07-23", "Buona Vista", "Bedok", 1, "pending");

DROP TABLE IF EXISTS bids;
CREATE TABLE bids (
  passenger VARCHAR(128),
  car CHAR(8),
  start_time TIMESTAMP,
  source VARCHAR(128),
  destination VARCHAR(128),
  amount FLOAT NOT NULL CHECK (amount >= 0),
  status VARCHAR(8) NOT NULL CHECK(status = 'pending' OR status = 'success' OR status = 'failed'),
  PRIMARY KEY (passenger, car, start_time, source, destination),
  FOREIGN KEY (passenger) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY (car, start_time, source, destination) REFERENCES rides(car, start_time, source, destination) ON DELETE CASCADE
);

-- INSERT INTO bids values ("Samuel", "A012324M", "2017-07-23", "Buona Vista", "Bedok", 20, "pending");
