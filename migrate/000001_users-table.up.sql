CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,

  username VARCHAR(255) NOT NULL DEFAULT '',
  password_hash VARCHAR(255) NOT NULL DEFAULT '',
  email VARCHAR(255) NOT NULL DEFAULT '',
  first_name VARCHAR(255) NOT NULL DEFAULT '',
  last_name VARCHAR(255) NOT NULL DEFAULT '',
  phone_number VARCHAR(255) NOT NULL DEFAULT '',
  assigned_tasks VARCHAR(2048) NOT NULL DEFAULT '',
  liked_games VARCHAR(2048) NOT NULL DEFAULT '',
  permission_level INT NOT NULL DEFAULT 0,
  age INT NOT NULL, 
  

  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,

  primary KEY (id)
);