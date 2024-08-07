drop table IF EXISTS chat;
drop table IF EXISTS question_res;
drop table IF EXISTS question_choice;
drop table IF EXISTS question;
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

create table user
(
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    user_email    VARCHAR(50) NOT NULL,
    user_gender   CHAR(1)     NOT NULL,
    user_password BINARY(60) NOT NULL,
    user_nickname VARCHAR(11) NOT NULL,
    is_deleted    CHAR(1)     NOT NULL,
    created_at    DATETIME    NOT NULL
);

create table schedule_category
(
    schedule_category_id   TINYINT AUTO_INCREMENT PRIMARY KEY,
    schedule_category_name VARCHAR(20) NOT NULL
);

create table schedule
(
    schedule_id             INT AUTO_INCREMENT PRIMARY KEY,
    user_id                 INT          NOT NULL,
    schedule_category_id    TINYINT      NOT NULL,
    schedule_start_datetime DATETIME     NOT NULL,
    schedule_end_datetime   DATETIME     NOT NULL,
    schedule_title          VARCHAR(200) NOT NULL,
    schedule_description    VARCHAR(200),
    schedule_where          VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (schedule_category_id) REFERENCES schedule_category (schedule_category_id)
);

create table spend_category
(
    spend_category_id   TINYINT AUTO_INCREMENT PRIMARY KEY,
    spend_category_name VARCHAR(20) NOT NULL
);

create table account
(
    account_id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id             INT          NOT NULL,
    spend_category_id   TINYINT NULL,
    account_type        CHAR(1)      NOT NULL,
    account_money       BIGINT       NOT NULL,
    account_title       VARCHAR(200) NOT NULL,
    account_description VARCHAR(200),
    account_datetime    DATETIME     NOT NULL,
    created_at          DATETIME     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (spend_category_id) REFERENCES spend_category (spend_category_id)
);

create table achievement
(
    achievement_id              INT AUTO_INCREMENT PRIMARY KEY,
    achievement_required_amount INT          NOT NULL,
    achievement_title           VARCHAR(80)  NOT NULL,
    achievement_description     VARCHAR(200) NOT NULL
);

create table achievement_state
(
    achievement_state_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id              INT  NOT NULL,
    achievement_id       INT  NOT NULL,
    achievement_count    INT  NOT NULL,
    achievement_date     DATETIME,
    is_achieved          BOOL NOT NULL
);

create table login_log
(
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

INSERT INTO achievement(achievement_required_amount, achievement_title, achievement_description)
VALUES (5, "연속 출석 5회", "연속 출석 5회 해줘!!"),
       (1, "아바타 생성", "아바타 생성해줘!!"),
       (10, "가계 등록 10회", "가계 등록 10회 해줘!!"),
       (10, "일정 등록 10회", "일정 등록 10회 해줘!!"),
       (3, "이스터 에그", "이스터 에그 찾아줘!!");

INSERT INTO achievement_state (user_id, achievement_id, achievement_count, achievement_date, is_achieved)
VALUES (1, 1, 2, null, 0),
       (1, 2, 1, now(), 1),
       (1, 3, 5, null, 0),
       (1, 4, 6, null, 0),
       (1, 5, 0, null, 0);

INSERT INTO achievement_state (user_id, achievement_id, achievement_count, achievement_date, is_achieved)
VALUES (2, 1, 2, null, 0),
       (2, 2, 1, now(), 1),
       (2, 3, 5, null, 0),
       (2, 4, 6, null, 0),
       (2, 5, 0, null, 0);

INSERT INTO achievement_state (user_id, achievement_id, achievement_count, achievement_date, is_achieved)
VALUES (3, 1, 2, null, 0),
       (3, 2, 1, now(), 1),
       (3, 3, 5, null, 0),
       (3, 4, 6, null, 0),
       (3, 5, 0, null, 0);

INSERT INTO achievement_state (user_id, achievement_id, achievement_count, achievement_date, is_achieved)
VALUES (4, 1, 2, null, 0),
       (4, 2, 1, now(), 1),
       (4, 3, 5, null, 0),
       (4, 4, 6, null, 0),
       (4, 5, 0, null, 0);


create table avatar
(
    avatar_id           INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             INT         NOT NULL,
    avatar_name         VARCHAR(40) NOT NULL,
    avatar_birthday     DATETIME    NOT NULL,
    avatar_personality  VARCHAR(100),
    avatar_assistant_id VARCHAR(60) NOT NULL,
    avatar_thread_id    VARCHAR(60) NOT NULL,
    avatar_voice_id     VARCHAR(60),
    is_deleted          BOOL        NOT NULL default FALSE,
    avatar_model        VARCHAR(6)     NOT NULL,
    avatar_residence    VARCHAR(40),
    avatar_job          VARCHAR(40),
    is_main             BOOL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

create table question
(
    question_id          SMALLINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    question_num         TINYINT      NOT NULL,
    question_description VARCHAR(200) NOT NULL,
    question_type        CHAR(1)      NOT NULL
);

create table question_choice
(
    question_choice_id          INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id                 SMALLINT     NOT NULL,
    question_choice_number      TINYINT      NOT NULL,
    question_choice_description VARCHAR(200) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question (question_id)
);

create table question_res
(
    question_res_id    INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id        SMALLINT NOT NULL,
    avatar_id          INT      NOT NULL,
    question_choice_id INT,
    subjective_ans     VARCHAR(200),
    question_type      CHAR(1)  NOT NULL
);

create table chat
(
    chat_id          BINARY(16) NOT NULL PRIMARY KEY,
    user_id          INT          NOT NULL,
    avatar_id        INT          NOT NULL,
    chat_category_id INT          NOT NULL,
    created_at       DATETIME     NOT NULL,
    chat_content     TEXT NOT NULL,
    chat_role        CHAR(1)      NOT NULL,
    chat_type        CHAR(1)      NOT NULL,
    sended_at        DATETIME     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (avatar_id) REFERENCES avatar (avatar_id)
);

INSERT INTO user(user_id, user_email, user_gender, user_password, user_nickname, is_deleted, created_at)
VALUES (1, 'khj745700@naver.com', 'M', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        '테스트객체', false, '2024-08-02');

INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (1, 1, '어떤 음식을 좋아하시나요?', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (1, 1, 1, '한식'),
       (2, 1, 2, '중식'),
       (3, 1, 3, '일식'),
       (4, 1, 4, '양식'),
       (5, 1, 5, '분식');

INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (2, 2, '어떤 음악 장르를 좋아하나요?', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (6, 2, 1, '케이팝'),
       (7, 2, 2, '팝송'),
       (8, 2, 3, '락'),
       (9, 2, 4, '발라드'),
       (10, 2, 5, 'R&B');

INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (3, 3, '취미가 무엇인가요?', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (11, 3, 1, '운동'),
       (12, 3, 2, '영화'),
       (13, 3, 3, '독서'),
       (14, 3, 4, '공연'),
       (15, 3, 5, '그림'),
       (16, 3, 6, '음악'),
       (17, 3, 7, '게임');

-- 네 번째 질문
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (4, 4, '자주 사용하는 앱이나 웹사이트가 있나요?', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (18, 4, 1, '유튜브'),
       (19, 4, 2, 'SNS'),
       (20, 4, 3, '게임'),
       (21, 4, 4, '인터넷 사이트'),
       (22, 4, 5, '온라인 쇼핑'),
       (23, 4, 6, '기타');

-- 다섯 번째 질문
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (5, 5, '최근에 시작한 활동이 있나요?', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (24, 5, 1, '일찍 일어나기'),
       (25, 5, 2, '새로운 공부'),
       (26, 5, 3, '꾸준한 운동'),
       (27, 5, 4, '긍정적인 생각'),
       (28, 5, 5, '건강한 식단'),
       (29, 5, 6, '기타');

-- 여섯 번째 질문
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (6, 6, '여행을 갈 때 주로 어떤 타입에 해당이 되시나요?', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (30, 6, 1, '경치 좋은 곳 위주로 나들이를 즐긴다'),
       (31, 6, 2, '볼거리와 재미를 주로 추구한다'),
       (32, 6, 3, '문화 체험을 지향한다'),
       (33, 6, 4, '음식이나 쇼핑 등을 선호한다'),
       (34, 6, 5, '여행을 가지 않는다');

INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (7, 7, '주로 방문하는 장소는 어디인가요? (도서관, 카페 등)', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (8, 8, '평소에 자주 먹는 음식 종류는 무엇인가요?(피자, 찌개, 국수 등)', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (9, 9, '주말에 주로 무엇을 하나요?', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (10, 10, '특별히 추천받고 싶은 분야가 있나요?', 's');

INSERT INTO avatar(avatar_id, user_id, avatar_name, avatar_birthday, avatar_personality, avatar_assistant_id,
                   avatar_thread_id, avatar_voice_id, is_deleted, avatar_model, avatar_residence, avatar_job, is_main)
VALUES (1, 1, '김다운', '2024-08-02', '지랄맞음', 'asst_gzUHR2Orr2KnitbLKcoaU9q3', 'thread_l57yNZOhonW5h2vOm8gkzhgw',
        'CrvDGrP4g0jagWAqURm5', false, "cow", '경북구미', '프톤트엔드엔지니어', true);

INSERT INTO question_res(question_res_id, question_id, avatar_id, question_choice_id, subjective_ans, question_type)
VALUES (1, 1, 1, 1, null, 'c'),
       (2, 2, 1, 9, null, 'c'),
       (3, 3, 1, 13, null, 'c'),
       (4, 4, 1, 18, null, 'c'),
       (5, 5, 1, 29, null, 'c'),
       (6, 6, 1, 34, null, 'c'),
       (7, 7, 1, null, '집', 's'),
       (8, 8, 1, null, '찌개', 's'),
       (9, 9, 1, null, '휴식', 's'),
       (10, 10, 1, null, '시 짓기', 's');
