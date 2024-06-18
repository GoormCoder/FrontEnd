-- create_tables.sql
CREATE DATABASE IF NOT EXISTS mydatabase;

USE mydatabase;

-- users 테이블 생성
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  joinDate DATE,
  avatar VARCHAR(255)
);

-- match_records 테이블 생성
CREATE TABLE IF NOT EXISTS match_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  opponent VARCHAR(100),
  date DATE,
  result ENUM('win', 'lose', 'draw'),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- stats 테이블 생성
CREATE TABLE IF NOT EXISTS stats (
  userId INT PRIMARY KEY,
  complimentPoints INT,
  answerCount INT,
  matchPoints INT,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- 더미 데이터 삽입
INSERT INTO users (name, email, joinDate, avatar) VALUES
('John Doe', 'john.doe@example.com', '2021-01-01', 'https://via.placeholder.com/150');

INSERT INTO match_records (userId, opponent, date, result) VALUES
(1, 'Alice', '2023-01-10', 'win'),
(1, 'Bob', '2023-02-15', 'lose'),
(1, 'Charlie', '2023-03-20', 'draw');

INSERT INTO stats (userId, complimentPoints, answerCount, matchPoints) VALUES
(1, 120, 45, 250);