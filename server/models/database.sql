CREATE DATABASE todoDb; 

CREATE TABLE todo (
    todo_id BIGSERIAL PRIMARY KEY NOT NULL, 
    description VARCHAR(255) NOT NULL, 
    isDone BOOLEAN NOT NULL
); 
