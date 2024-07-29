drop table IF EXISTS chat;
drop table IF EXISTS schedule;
drop table IF EXISTS schedule_category;
drop table IF EXISTS achievement;
drop table IF EXISTS achievement_state;
drop table IF EXISTS avatar;
drop table IF EXISTS login_log;
drop table IF EXISTS user;

create table schedule_category(
    schedule_category_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    schedule_category_name VARCHAR(20) NOT NULL
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

create table user(
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    user_email    VARCHAR(50) NOT NULL,
    user_gender   CHAR(1)     NOT NULL,
    user_password BINARY(60) NOT NULL,
    user_nickname VARCHAR(11) NOT NULL,
    is_deleted    CHAR(1)     NOT NULL,
    created_at    DATETIME    NOT NULL
);

create table login_log(
    login_log_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT      NOT NULL,
    login_datetime DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
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

insert into schedule_category(schedule_category_name)
values ('집에 가기');

insert into achievement(achievement_required_amount, achievement_title, achievement_description)
values (7, "로그인", "로그인 해줘"),
       (1, "설문", "설문 해줘"),
       (5, "가계 등록", "가계 등록 해줘"),
       (5, "일정 등록", "일정 등록 해줘"),
       (3, "이스터 에그", "이스터 에그 찾아줘");