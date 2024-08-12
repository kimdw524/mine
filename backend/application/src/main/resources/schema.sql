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
    achieved_date        DATETIME,
    is_achieved          BOOL NOT NULL
);

create table login_log
(
    login_log_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT      NOT NULL,
    login_datetime DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

create table avatar
(
    avatar_id           INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             INT         NOT NULL,
    avatar_name         VARCHAR(40) NOT NULL,
    avatar_birthday     DATETIME    NOT NULL,
    avatar_personality  VARCHAR(100),
    avatar_assistant_id VARCHAR(60),
    avatar_thread_id    VARCHAR(60),
    avatar_voice_id     VARCHAR(60),
    is_deleted          BOOL        NOT NULL default FALSE,
    avatar_model        VARCHAR(7)  NOT NULL,
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
    user_id          INT      NOT NULL,
    avatar_id        INT      NOT NULL,
    chat_category_id INT      NOT NULL,
    created_at       DATETIME NOT NULL,
    chat_content     TEXT     NOT NULL,
    chat_role        CHAR(1)  NOT NULL,
    chat_type        CHAR(1)  NOT NULL,
    sended_at        DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (avatar_id) REFERENCES avatar (avatar_id)
);

# INSERT INTO user(user_id, user_email, user_gender, user_password, user_nickname, is_deleted, created_at)
# VALUES (1, 'khj745700@naver.com', 'M', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
#         '테스트객체', false, '2024-08-02'),
#        (3, 'tjs2194@naver.com', 'F', CAST('$2a$10$OIi82DB5rJEISzKngkppzOUCgmpuJ4rVTilClSYg9lFBSsQwe74mS' AS BINARY),
#         '미래의토스인', false, '2024-08-02');


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
       (1, "[이스터 에그] 아바타 클릭", "아바타를 10번을 클릭해줘!!"),
       (1, "[이스터 에그] 아바타 흔들기", "아바타를 20번 이상 움직여줘!!"),
       (1, "[이스터 에그] 채팅", "채팅에 바보라고 입력해줘!!");

INSERT INTO achievement_state (user_id, achievement_id, achievement_count, achieved_date, is_achieved)
VALUES (1, 1, 2, null, 0),
       (1, 2, 1, now(), 1),
       (1, 3, 5, null, 0),
       (1, 4, 6, null, 0),
       (1, 5, 0, null, 0),
       (1, 6, 0, null, 0),
       (1, 7, 0, null, 0),
       (2, 1, 2, null, 0),
       (2, 2, 1, now(), 1),
       (2, 3, 5, null, 0),
       (2, 4, 6, null, 0),
       (2, 5, 0, null, 0),
       (2, 6, 0, null, 0),
       (2, 7, 0, null, 0),
       (3, 1, 2, null, 0),
       (3, 2, 1, now(), 1),
       (3, 3, 5, null, 0),
       (3, 4, 6, null, 0),
       (3, 5, 0, null, 0),
       (3, 6, 0, null, 0),
       (3, 7, 0, null, 0),
       (4, 1, 2, null, 0),
       (4, 2, 1, now(), 1),
       (4, 3, 5, null, 0),
       (4, 4, 6, null, 0),
       (4, 5, 0, null, 0),
       (4, 6, 0, null, 0),
       (4, 7, 0, null, 0);

INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (1, 1, '좋아하는 영화는', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (1, 1, 1, '코미디'),
       (2, 1, 2, '액션'),
       (3, 1, 3, '공포'),
       (4, 1, 4, '멜로');

INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (2, 2, '좋아하는 음악은', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (5, 2, 1, '클래식'),
       (6, 2, 2, '재즈'),
       (7, 2, 3, '발라드'),
       (8, 2, 4, '힙합'),
       (9, 2, 5, 'R&B');

INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (3, 3, '좋아하는 여행지는', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (10, 3, 1, '바다'),
       (11, 3, 2, '산'),
       (12, 3, 3, '도시'),
       (13, 3, 4, '섬');

-- 네 번째 질문
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (4, 4, '인생에서 가장 중요하게 생각하는 것은', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (14, 4, 1, '돈'),
       (15, 4, 2, '건강'),
       (16, 4, 3, '가족&친구'),
       (17, 4, 4, '개인의 성장');

-- 다섯 번째 질문
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (5, 5, '최근에 시작한 활동이 있나요?', 'c');
INSERT INTO question_choice(question_choice_id, question_id, question_choice_number, question_choice_description)
VALUES (18, 5, 1, '빠르고 역동적인 활동'),
       (19, 5, 2, '탐험과 탐색 활동'),
       (20, 5, 3, '느긋하고 여유로운 활동'),
       (21, 5, 4, '창의적이고 문제 해결 중심의 활동');


INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (6, 6, 'MBTI는', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (7, 7, '남들과 다른 독특한 취미는', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (8, 8, '특별한 주말을 보내는 법은', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (9, 9, '스트레스 해소법은', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (10, 10, '인생 좌우명은', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (11, 11, '생활 습관은', 's');
INSERT INTO question(question_id, question_num, question_description, question_type)
VALUES (12, 12, '좋아하는 음식 종류는', 's');

# INSERT INTO avatar(avatar_id, user_id, avatar_name, avatar_birthday, avatar_personality, avatar_assistant_id,
#                    avatar_thread_id, avatar_voice_id, is_deleted, avatar_model, avatar_residence, avatar_job, is_main)
# VALUES (1, 1, '김다운', '2024-08-02', '착함!! ㅎㅎ', 'asst_DPksAEgIePcXxIyJOPrM3n2o', 'thread_Rd3xUTKMTmrwYiY9Oss5upna',
#         'CrvDGrP4g0jagWAqURm5', false, 'cow', '경북구미', '프톤트엔드엔지니어', true);

# INSERT INTO question_res(question_res_id, question_id, avatar_id, question_choice_id, subjective_ans, question_type)
# VALUES (1, 1, 1, 3, null, 'c'),
#        (2, 2, 1, 7, null, 'c'),
#        (3, 3, 1, 13, null, 'c'),
#        (4, 4, 1, 15, null, 'c'),
#        (5, 5, 1, 20, null, 'c'),
#        (6, 6, 1, null, 'ISTJ', 's'),
#        (7, 7, 1, null, '핫딜 찾기', 's'),
#        (8, 8, 1, null, '술 마시기', 's'),
#        (9, 9, 1, null, '누워있기', 's'),
#        (10, 10, 1, null, '열심히 살자', 's'),
#        (11, 11, 1, null, '늦게 자기', 's'),
#        (12, 12, 1, null, '중식', 's');
#
#
# -- 7월 데이터 (20개)
# INSERT INTO account (user_id, spend_category_id, account_type, account_money, account_title, account_description,
#                      account_datetime, created_at)
# VALUES
# -- 수입 데이터 (account_type = 'I', spend_category_id = NULL)
# (3, NULL, 'I', 500000, '월급', '7월 월급', '2024-07-01 10:00:00', NOW()),
# (3, NULL, 'I', 200000, '프리랜서', '프리랜서 프로젝트', '2024-07-05 14:30:00', NOW()),
# (3, NULL, 'I', 300000, '보너스', '여름 보너스', '2024-07-15 11:00:00', NOW()),
# (3, NULL, 'I', 150000, '용돈', '부모님 용돈', '2024-07-20 09:00:00', NOW()),
# (3, NULL, 'I', 250000, '투자 수익', '주식 투자 수익', '2024-07-25 16:00:00', NOW()),
#
# -- 지출 데이터 (account_type = 'S', spend_category_id는 1~15 사이의 값)
# (3, 3, 'S', 50000, '저녁 식사', '외식', '2024-07-02 19:00:00', NOW()),
# (3, 2, 'S', 150000, '여행', '주말 여행', '2024-07-03 08:00:00', NOW()),
# (3, 4, 'S', 80000, '영화 관람', '영화 티켓', '2024-07-06 20:00:00', NOW()),
# (3, 7, 'S', 70000, '미용실', '헤어컷', '2024-07-08 13:00:00', NOW()),
# (3, 5, 'S', 100000, '병원', '정기 검진', '2024-07-10 10:00:00', NOW()),
# (3, 6, 'S', 120000, '클럽', '클럽 파티', '2024-07-12 23:00:00', NOW()),
# (3, 8, 'S', 30000, '버스', '버스 교통비', '2024-07-14 07:00:00', NOW()),
# (3, 10, 'S', 60000, '학원', '영어 학원비', '2024-07-17 18:00:00', NOW()),
# (3, 11, 'S', 40000, '휴대폰 요금', '통신비', '2024-07-19 15:00:00', NOW()),
# (3, 12, 'S', 200000, '결혼식', '친구 결혼식 축의금', '2024-07-21 12:00:00', NOW()),
# (3, 13, 'S', 15000, '넷플릭스', 'OTT 구독료', '2024-07-23 22:00:00', NOW()),
# (3, 14, 'S', 800000, '월세', '주거비', '2024-07-25 09:00:00', NOW()),
# (3, 9, 'S', 50000, '마트', '식료품 구입', '2024-07-27 11:00:00', NOW()),
# (3, 15, 'S', 60000, '기타 지출', '기타 잡비', '2024-07-28 14:00:00', NOW()),
# (3, 1, 'S', 70000, '예비비', '미정 예비비', '2024-07-30 13:00:00', NOW());
#
# -- 8월 데이터 (20개)
# INSERT INTO account (user_id, spend_category_id, account_type, account_money, account_title, account_description,
#                      account_datetime, created_at)
# VALUES
# -- 수입 데이터 (account_type = 'I', spend_category_id = NULL)
# (3, NULL, 'I', 500000, '월급', '8월 월급', '2024-08-01 10:00:00', NOW()),
# (3, NULL, 'I', 200000, '프리랜서', '프리랜서 프로젝트', '2024-08-05 14:30:00', NOW()),
# (3, NULL, 'I', 300000, '보너스', '여름 보너스', '2024-08-15 11:00:00', NOW()),
# (3, NULL, 'I', 150000, '용돈', '부모님 용돈', '2024-08-20 09:00:00', NOW()),
# (3, NULL, 'I', 250000, '투자 수익', '주식 투자 수익', '2024-08-25 16:00:00', NOW()),
#
# -- 지출 데이터 (account_type = 'S', spend_category_id는 1~15 사이의 값)
# (3, 3, 'S', 50000, '저녁 식사', '외식', '2024-08-02 19:00:00', NOW()),
# (3, 2, 'S', 150000, '여행', '주말 여행', '2024-08-03 08:00:00', NOW()),
# (3, 4, 'S', 80000, '영화 관람', '영화 티켓', '2024-08-06 20:00:00', NOW()),
# (3, 7, 'S', 70000, '미용실', '헤어컷', '2024-08-08 13:00:00', NOW()),
# (3, 5, 'S', 100000, '병원', '정기 검진', '2024-08-10 10:00:00', NOW()),
# (3, 6, 'S', 120000, '클럽', '클럽 파티', '2024-08-12 23:00:00', NOW()),
# (3, 8, 'S', 30000, '버스', '버스 교통비', '2024-08-14 07:00:00', NOW()),
# (3, 10, 'S', 60000, '학원', '영어 학원비', '2024-08-17 18:00:00', NOW()),
# (3, 11, 'S', 40000, '휴대폰 요금', '통신비', '2024-08-19 15:00:00', NOW()),
# (3, 12, 'S', 200000, '결혼식', '친구 결혼식 축의금', '2024-08-21 12:00:00', NOW()),
# (3, 13, 'S', 15000, '넷플릭스', 'OTT 구독료', '2024-08-23 22:00:00', NOW()),
# (3, 14, 'S', 800000, '월세', '주거비', '2024-08-25 09:00:00', NOW()),
# (3, 9, 'S', 50000, '마트', '식료품 구입', '2024-08-27 11:00:00', NOW()),
# (3, 15, 'S', 60000, '기타 지출', '기타 잡비', '2024-08-28 14:00:00', NOW()),
# (3, 1, 'S', 70000, '예비비', '미정 예비비', '2024-08-30 13:00:00', NOW());
#
# -- 7월 데이터 (20개)
# INSERT INTO schedule (user_id, schedule_category_id, schedule_start_datetime, schedule_end_datetime, schedule_title,
#                       schedule_description, schedule_where)
# VALUES (3, 1, '2024-07-01 09:00:00', '2024-07-01 10:00:00', '미정 일정', '아직 정해지지 않은 일정', '미정 장소'),
#        (3, 2, '2024-07-03 07:00:00', '2024-07-05 19:00:00', '여행', '여름 휴가 여행', '제주도'),
#        (3, 3, '2024-07-06 12:00:00', '2024-07-06 14:00:00', '점심 외식', '동료들과 점심 식사', '한식당'),
#        (3, 4, '2024-07-07 09:00:00', '2024-07-07 18:00:00', '업무 회의', '주간 업무 회의', '회의실'),
#        (3, 5, '2024-07-08 18:00:00', '2024-07-08 20:00:00', '친구 약속', '친구와 저녁 식사', '이탈리안 레스토랑'),
#        (3, 6, '2024-07-10 14:00:00', '2024-07-10 16:00:00', '중간고사', '여름학기 중간고사', '대학 캠퍼스'),
#        (3, 7, '2024-07-11 10:00:00', '2024-07-11 12:00:00', '기타 일정', '개인 시간', '공원'),
#        (3, 1, '2024-07-12 08:00:00', '2024-07-12 09:00:00', '미정 일정', '아직 정해지지 않은 일정', '미정 장소'),
#        (3, 2, '2024-07-13 07:00:00', '2024-07-15 19:00:00', '여행', '가족과 주말 여행', '강릉'),
#        (3, 3, '2024-07-16 12:00:00', '2024-07-16 14:00:00', '점심 외식', '가족들과 점심 식사', '중식당'),
#        (3, 4, '2024-07-17 09:00:00', '2024-07-17 18:00:00', '업무 보고서 작성', '월간 보고서 작성', '사무실'),
#        (3, 5, '2024-07-18 18:00:00', '2024-07-18 20:00:00', '동창회 약속', '고등학교 동창회', '한식당'),
#        (3, 6, '2024-07-19 14:00:00', '2024-07-19 16:00:00', '기말고사', '여름학기 기말고사', '대학 캠퍼스'),
#        (3, 7, '2024-07-20 10:00:00', '2024-07-20 12:00:00', '기타 일정', '쇼핑', '쇼핑몰'),
#        (3, 1, '2024-07-21 08:00:00', '2024-07-21 09:00:00', '미정 일정', '아직 정해지지 않은 일정', '미정 장소'),
#        (3, 2, '2024-07-22 07:00:00', '2024-07-24 19:00:00', '여행', '친구와 주말 여행', '부산'),
#        (3, 3, '2024-07-25 12:00:00', '2024-07-25 14:00:00', '점심 외식', '회사 동료들과 점심 식사', '일식당'),
#        (3, 4, '2024-07-26 09:00:00', '2024-07-26 18:00:00', '프로젝트 회의', '새 프로젝트 논의', '회의실'),
#        (3, 5, '2024-07-27 18:00:00', '2024-07-27 20:00:00', '저녁 약속', '지인과 저녁 식사', '한식당'),
#        (3, 6, '2024-07-28 14:00:00', '2024-07-28 16:00:00', '시험', '자격증 시험', '시험장');
#
# -- 8월 데이터 (20개)
# INSERT INTO schedule (user_id, schedule_category_id, schedule_start_datetime, schedule_end_datetime, schedule_title,
#                       schedule_description, schedule_where)
# VALUES (3, 1, '2024-08-01 09:00:00', '2024-08-01 10:00:00', '미정 일정', '아직 정해지지 않은 일정', '미정 장소'),
#        (3, 2, '2024-08-03 07:00:00', '2024-08-05 19:00:00', '여행', '여름 휴가 여행', '제주도'),
#        (3, 3, '2024-08-06 12:00:00', '2024-08-06 14:00:00', '점심 외식', '동료들과 점심 식사', '한식당'),
#        (3, 4, '2024-08-07 09:00:00', '2024-08-07 18:00:00', '업무 회의', '주간 업무 회의', '회의실'),
#        (3, 5, '2024-08-08 18:00:00', '2024-08-08 20:00:00', '친구 약속', '친구와 저녁 식사', '이탈리안 레스토랑'),
#        (3, 6, '2024-08-10 14:00:00', '2024-08-10 16:00:00', '중간고사', '여름학기 중간고사', '대학 캠퍼스'),
#        (3, 7, '2024-08-11 10:00:00', '2024-08-11 12:00:00', '기타 일정', '개인 시간', '공원'),
#        (3, 1, '2024-08-12 08:00:00', '2024-08-12 09:00:00', '미정 일정', '아직 정해지지 않은 일정', '미정 장소'),
#        (3, 2, '2024-08-13 07:00:00', '2024-08-15 19:00:00', '여행', '가족과 주말 여행', '강릉'),
#        (3, 3, '2024-08-16 12:00:00', '2024-08-16 14:00:00', '점심 외식', '가족들과 점심 식사', '중식당'),
#        (3, 4, '2024-08-17 09:00:00', '2024-08-17 18:00:00', '업무 보고서 작성', '월간 보고서 작성', '사무실'),
#        (3, 5, '2024-08-18 18:00:00', '2024-08-18 20:00:00', '동창회 약속', '고등학교 동창회', '한식당'),
#        (3, 6, '2024-08-19 14:00:00', '2024-08-19 16:00:00', '기말고사', '여름학기 기말고사', '대학 캠퍼스'),
#        (3, 7, '2024-08-20 10:00:00', '2024-08-20 12:00:00', '기타 일정', '쇼핑', '쇼핑몰'),
#        (3, 1, '2024-08-21 08:00:00', '2024-08-21 09:00:00', '미정 일정', '아직 정해지지 않은 일정', '미정 장소'),
#        (3, 2, '2024-08-22 07:00:00', '2024-08-24 19:00:00', '여행', '친구와 주말 여행', '부산'),
#        (3, 3, '2024-08-25 12:00:00', '2024-08-25 14:00:00', '점심 외식', '회사 동료들과 점심 식사', '일식당'),
#        (3, 4, '2024-08-26 09:00:00', '2024-08-26 18:00:00', '프로젝트 회의', '새 프로젝트 논의', '회의실'),
#        (3, 5, '2024-08-27 18:00:00', '2024-08-27 20:00:00', '저녁 약속', '지인과 저녁 식사', '한식당'),
#        (3, 6, '2024-08-28 14:00:00', '2024-08-28 16:00:00', '시험', '자격증 시험', '시험장');
