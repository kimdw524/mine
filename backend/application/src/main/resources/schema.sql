drop table IF EXISTS chat;
drop table IF EXISTS schedule;
drop table IF EXISTS schedule_category;
drop table IF EXISTS achievement;
drop table IF EXISTS achievement_state;
drop table IF EXISTS avatar;
drop table IF EXISTS login_log;
drop table IF EXISTS account;
drop table IF EXISTS spend_category;
drop table IF EXISTS chat;
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

create table chat(
    chat_id BINARY(16) NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    avatar_id INT NOT NULL,
    chat_category_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    chat_content VARCHAR(300) NOT NULL,
    chat_role CHAR(1) NOT NULL,
    chat_type CHAR(1) NOT NULL,
    sended_at DATETIME NOT NULL,
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

INSERT INTO achievement(achievement_required_amount, achievement_title, achievement_description)
VALUES (5, "연속 출석 5회", "연속 출석 5회 해줘!!"),
       (1, "아바타 생성", "아바타 생성해줘!!"),
       (10, "가계 등록 10회", "가계 등록 10회 해줘!!"),
       (10, "일정 등록 10회", "일정 등록 10회 해줘!!"),
       (3, "이스터 에그", "이스터 에그 찾아줘!!");

INSERT INTO achievement_state (user_id, achievement_id, achievement_count, achievement_date, is_achieved)
VALUES (2, 1, 2, null, 0),
       (2, 2, 1, now(), 1),
       (2, 3, 5, null, 0),
       (2, 4, 6, null, 0),
       (2, 5, 0, null, 0);
