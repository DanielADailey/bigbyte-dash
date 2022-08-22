CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,

  title VARCHAR(255) NOT NULL DEFAULT '',
  task_description VARCHAR(255) NOT NULL DEFAULT '',
  start_time BIGINT NOT NULL, 
  end_time BIGINT NOT NULL, 
  status INT NOT NULL, 
  group_id VARCHAR(255) NOT NULL DEFAULT '',
  created_by VARCHAR(255) NOT NULL DEFAULT '',
  assigned_to VARCHAR(255) NOT NULL DEFAULT '',
  comments VARCHAR(255) NOT NULL DEFAULT '', 
  

  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,

  primary KEY (id)
);