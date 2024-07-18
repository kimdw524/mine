drop table IF EXISTS user;

create table user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone_num CHAR(11) NOT NULL,
    gender CHAR(1) NOT NULL,
    password BINARY(60) NOT NULL,
    nickname VARCHAR(11) NOT NULL,
    is_deleted CHAR(1) NOT NULL,
    created_at DATETIME NOT NULL
)