CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,

  title VARCHAR(255) NOT NULL DEFAULT '',
  task_description VARCHAR(4096) NOT NULL DEFAULT '',
  start_time BIGINT NOT NULL, 
  end_time BIGINT NOT NULL, 
  status INT NOT NULL, 
  priority INT NOT NULL,
  group_id VARCHAR(255) NOT NULL DEFAULT '',
  created_by INT NOT NULL DEFAULT 0,
  assigned_to INT NOT NULL DEFAULT 0,
  comments VARCHAR(4096) NOT NULL DEFAULT '', 
  

  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,

  primary KEY (id)
);