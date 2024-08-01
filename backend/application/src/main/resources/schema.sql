drop table IF EXISTS chat;
drop table IF EXISTS schedule;
drop table IF EXISTS schedule_category;
drop table IF EXISTS achievement;
drop table IF EXISTS achievement_state;
drop table IF EXISTS avatar;
drop table IF EXISTS login_log;
drop table IF EXISTS account;
drop table IF EXISTS spend_category;
drop table IF EXISTS user;

create table user(
     user_id       INT AUTO_INCREMENT PRIMARY KEY,
     user_email    VARCHAR(50) NOT NULL,
     user_gender   CHAR(1)     NOT NULL,
     user_password BINARY(60) NOT NULL,
     user_nickname VARCHAR(11) NOT NULL,
     is_deleted    CHAR(1)     NOT NULL,
     created_at    DATETIME    NOT NULL
);

create table schedule_category(
    schedule_category_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    schedule_category_name VARCHAR(20) NOT NULL
);

create table schedule(
     schedule_id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     schedule_category_id TINYINT NOT NULL,
     schedule_start_datetime DATETIME NOT NULL,
     schedule_end_datetime DATETIME NOT NULL,
     schedule_title VARCHAR(200) NOT NULL,
     schedule_description VARCHAR(200),
     schedule_where VARCHAR(200),
     FOREIGN KEY (user_id) REFERENCES user(user_id),
     FOREIGN KEY (schedule_category_id) REFERENCES schedule_category(schedule_category_id)
);

create table spend_category(
    spend_category_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    spend_category_name VARCHAR(20) NOT NULL
);

create table account(
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    spend_category_id TINYINT NULL,
    account_type CHAR(1) NOT NULL,
    account_money BIGINT NOT NULL,
    account_title VARCHAR(200) NOT NULL,
    account_description VARCHAR(200),
    account_datetime DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (spend_category_id) REFERENCES spend_category(spend_category_id)
);

create table achievement(
    achievement_id              INT AUTO_INCREMENT PRIMARY KEY,
    achievement_required_amount INT          NOT NULL,
    achievement_title           VARCHAR(80)  NOT NULL,
    achievement_description     VARCHAR(200) NOT NULL
);

create table achievement_state(
    achievement_state_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id              INT  NOT NULL,
    achievement_id       INT  NOT NULL,
    achievement_count    INT  NOT NULL,
    achievement_date     DATETIME,
    is_achieved          BOOL NOT NULL
);

create table login_log(
    login_log_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT      NOT NULL,
    login_datetime DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

INSERT INTO spend_category (spend_category_name)
VALUES ('미정'),
       ('여행'),
       ('음식'),
       ('문화'),
       ('의료'),
       ('유흥'),
       ('미용'),
       ('교통'),
       ('생활'),
       ('교육'),
       ('통신'),
       ('경조사'),
       ('OTT'),
       ('주거'),
       ('기타');

INSERT INTO schedule_category (schedule_category_name)
VALUES ('미정'),
       ('여행'),
       ('외식'),
       ('업무'),
       ('약속'),
       ('시험'),
       ('기타');
