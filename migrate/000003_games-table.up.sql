CREATE TABLE games (
  id INT NOT NULL AUTO_INCREMENT,

  title VARCHAR(255) NOT NULL DEFAULT '',
  cover_art VARCHAR(4096) NOT NULL DEFAULT '',
  release_date VARCHAR(255) NOT NULL, 
  rating INT NOT NULL, 
  tags VARCHAR(255) NOT NULL DEFAULT '', 
  description VARCHAR(4096),
  

  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,

  primary KEY (id)
);