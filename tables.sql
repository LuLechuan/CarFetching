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

DROP TABLE IF EXISTS allusers CASCADE;
CREATE TABLE users_log (
  operation CHAR(1) NOT NULL,
  username VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(64) NOT NULL,
  age INTEGER NOT NULL,
  sex VARCHAR(8) NOT NULL check(sex = 'male' OR sex = 'female'),
  role VARCHAR(10) NOT NULL check(role = 'admin' OR role = 'driver' OR role = 'passenger')
);

CREATE OR REPLACE FUNCTION users_log()
RETURNS TRIGGER AS $$
BEGIN
IF (TG_OP = 'DELETE') THEN
INSERT INTO users_log values('D', old.username, old.password, old.name, old.age, old.sex, old.role);
RETURN OLD;
ELSIF (TG_OP = 'UPDATE') THEN
INSERT INTO users_log values('U', new.username, new.password, new.name, new.age, new.sex, new.role);
RETURN NEW;
ELSIF (TG_OP = 'INSERT') THEN
INSERT INTO users_log values('I', new.username, new.password, new.name, new.age, new.sex, new.role);
RETURN NEW;
END IF;
RETURN NULL;
END; $$ LANGUAGE PLPGSQL;

DROP TRIGGER users_log ON users;

CREATE TRIGGER users_log
AFTER INSERT OR UPDATE OR DELETE
ON users
FOR EACH ROW
EXECUTE PROCEDURE users_log();


INSERT INTO users VALUES('Oliver123','123njdidw','Oliver',20,'female','driver');
INSERT INTO users VALUES('Jack123','dwjwedjw','Jack',21,'male','driver');
INSERT INTO users VALUES('Harry234','dedew31','Harry',22,'male','driver');
INSERT INTO users VALUES('Jacob239','29jwe2','Jacob',24,'male','driver');
INSERT INTO users VALUES('Amelia238','n392e32','Amelia',25,'female','driver');
INSERT INTO users VALUES('Jessica2578','dni34i','Jessica',20,'female','driver');
INSERT INTO users VALUES('Joanne920','e3hd32udh2i','Joanne',21,'female','driver');
INSERT INTO users VALUES('Megan9u8','2ehd3uhi3u','Megan',22,'female','driver');
INSERT INTO users VALUES('Charles647','34f347','Charles',23,'male','driver');
INSERT INTO users VALUES('Bethanye39','edn3i3fd23d','Bethany',25,'female','driver');

INSERT INTO users VALUES('Ava923','2e2d823','Ava',21,'female','passenger');
INSERT INTO users VALUES('Abigail223','328d33','Abigail',22,'female','passenger');
INSERT INTO users VALUES('Barbara231','d32d32','Barbara',40,'female','passenger');
INSERT INTO users VALUES('Damian678','d2du323e','Damian',46,'male','passenger');
INSERT INTO users VALUES('Alexander894','g45g54','Alexander',34,'male','passenger');
INSERT INTO users VALUES('Liam989','dwbuwbwe','Liam',22,'male','passenger');
INSERT INTO users VALUES('Connor232','dbwudyebudw','Connor',22,'male','passenger');
INSERT INTO users VALUES('Sophia239','fwi2rr2','Sophia',40,'female','passenger');
INSERT INTO users VALUES('Isabella237','s3j292f29','Isabella',46,'female','passenger');
INSERT INTO users VALUES('William287','d2if1n39ff','William',34,'male','passenger');
INSERT INTO users VALUES('Michael231','2n283ess2','Michael',22,'male','passenger');
INSERT INTO users VALUES('Kyle283','3128dh238dh','Kyle',22,'male','passenger');
INSERT INTO users VALUES('Reece389','ejd229jd2','Reece',40,'female','passenger');
INSERT INTO users VALUES('Margaret290','n293d2','Margaret',46,'female','passenger');
INSERT INTO users VALUES('Linda821','32db832d','Linda',34,'female','passenger');

INSERT INTO users VALUES('Sarah2','32db832d','Sarah',34,'female','passenger');
INSERT INTO users VALUES('Michelle96','32db832d','Michelle',20,'female','driver');
DELETE from users WHERE username = 'Michelle96';
UPDATE users SET age = 44 WHERE username = 'Sarah2';

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
  FOREIGN KEY (driver) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO cars values ('SBW1234W', 'Oliver123', '5', 'Toyota');
INSERT INTO cars values ('SBQ1232Q', 'Jack123', '6', 'Audi');
INSERT INTO cars values ('SSQ2342E', 'Harry234', '4', 'Ford');
INSERT INTO cars values ('SAX2322F', 'Jacob239', '5', 'Honda');
INSERT INTO cars values ('SCZ2452F', 'Amelia238', '4', 'Volkswagen');

INSERT INTO cars values ('SRW1254W', 'Jessica2578', '5', 'Toyota');
INSERT INTO cars values ('SBQ1214O', 'Joanne920', '6', 'Audi');
INSERT INTO cars values ('SPP2342E', 'Megan9u8', '4', 'Ford');
INSERT INTO cars values ('SKK2322F', 'Charles647', '5', 'Honda');
INSERT INTO cars values ('SII2452F', 'Bethanye39', '4', 'Volkswagen');

-- INSERT INTO cars values ("A012324M", "Ahchuang", "6", "Toyota");

DROP TABLE IF EXISTS rides CASCADE;
CREATE TABLE rides (
  ride_id INT NOT NULL UNIQUE,
  car CHAR(8),
  start_time TIMESTAMP,
  source VARCHAR(128),
  destination VARCHAR(128),
  number_passenger INT,
  status VARCHAR(8) NOT NULL CHECK(status = 'pending' OR status = 'success' OR status = 'failed'),
  PRIMARY KEY (car, start_time, source, destination),
  CHECK (source <> destination),
  FOREIGN KEY (car) REFERENCES cars(plate_number) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO rides values (1,'SBW1234W', '2018-10-11 04:05:06', 'Buona Vista', 'Bedok', 1, 'pending');
INSERT INTO rides values (2,'SBQ1232Q', '2018-10-11 08:00:00', 'Jurong East', 'Bedok', 2, 'pending');
INSERT INTO rides values (3,'SSQ2342E', '2018-10-10 10:00:00', 'Jurong East', 'Changi', 1, 'pending');
INSERT INTO rides values (4,'SAX2322F', '2018-10-11 12:00:00', 'Chinatown', 'Woodland', 3, 'pending');
INSERT INTO rides values (5,'SCZ2452F', '2018-10-10 23:00:00', 'Boon Lay', 'Tampines', 2, 'pending');

INSERT INTO rides values (6,'SRW1254W', '2018-10-11 04:05:06', 'Buona Vista', 'Newton', 1, 'pending');
INSERT INTO rides values (7,'SBQ1214O', '2018-10-11 08:30:00', 'Jurong West', 'Newton', 2, 'pending');
INSERT INTO rides values (8,'SPP2342E', '2018-10-10 10:30:00', 'Jurong West', 'Changi', 1, 'pending');
INSERT INTO rides values (9,'SKK2322F', '2018-10-11 12:30:00', 'Hougang', 'Woodland', 3, 'pending');
INSERT INTO rides values (10,'SII2452F', '2018-10-10 23:30:00', 'Bartley', 'Tampines', 2, 'pending');
INSERT INTO rides values (11,'SBW1234W', '2018-11-07 17:00:00', 'Changi Airport', 'NUS', 3, 'pending');

-- INSERT INTO rides values ("A012324M", "2017-07-23", "Buona Vista", "Bedok", 1, "pending");

DROP TABLE IF EXISTS bids;
CREATE TABLE bids (
  bid_id INT NOT NULL UNIQUE,
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

INSERT INTO bids values (1,'Ava923','SBW1234W','2018-10-11 04:05:06','Buona Vista','Bedok',10.5,'pending');
INSERT INTO bids values (2,'Abigail223','SBQ1232Q','2018-10-11 08:00:00','Jurong East','Bedok',20.5,'pending');
INSERT INTO bids values (3,'Barbara231','SSQ2342E','2018-10-10 10:00:00','Jurong East','Changi',22.5,'pending');
INSERT INTO bids values (4,'Damian678','SAX2322F','2018-10-11 12:00:00','Chinatown','Woodland',12.5,'pending');
INSERT INTO bids values (5,'Alexander894','SCZ2452F','2018-10-10 23:00:00','Boon Lay','Tampines',31.5,'pending');

INSERT INTO bids values (6,'Linda821','SRW1254W','2018-10-11 04:05:06','Buona Vista','Newton',10.5,'pending');
INSERT INTO bids values (7,'Margaret290','SBQ1214O','2018-10-11 08:30:00','Jurong West','Newton',20.5,'pending');
INSERT INTO bids values (8,'Reece389','SPP2342E','2018-10-10 10:30:00','Jurong West','Changi',22.5,'pending');
INSERT INTO bids values (9,'Kyle283','SKK2322F','2018-10-11 12:30:00','Hougang','Woodland',12.5,'pending');
INSERT INTO bids values (10,'Michael231','SII2452F','2018-10-10 23:30:00','Bartley','Tampines',31.5,'pending');
INSERT INTO bids values (11,'Abigail223','SBW1234W','2018-11-07 17:00:00','Changi Airport','NUS',200,'pending');
