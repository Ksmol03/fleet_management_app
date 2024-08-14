CREATE TABLE users(
	username VARCHAR(30) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    first_hashed_password VARCHAR(60) NOT NULL,
    second_hashed_password VARCHAR(60),
    third_hashed_password VARCHAR(60),
    fourth_hashed_password VARCHAR(60),
    fifth_hashed_password VARCHAR(60),
    password_change_date DATE DEFAULT CURRENT_DATE NOT NULL,
    activated TINYINT(1) NOT NULL DEFAULT 0
);

INSERT INTO users(username, email, first_hashed_password, activated) VALUES('admin', 'admin@example.com', '$2a$12$J3iwEKpRkUJ1sEUc37MTXeP28l1UPt09l0jIflUxAzZ/XU3Vjz4Iu', 1);