CREATE DATABASE IF NOT EXISTS student_registration;

CREATE TABLE IF NOT EXISTS student_registration(
	student_number VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    course_code VARCHAR(50) NOT NULL, 
    course_title VARCHAR(255) NOT NULL
);

