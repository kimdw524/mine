import pymysql


def crate_session():
    conn = pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="ssafy",
        db='mine',
        charset="utf8",
        cursorclass=pymysql.cursors.DictCursor
    )
    cur = conn.cursor()
    return conn, cur


def get_assistant_id(avatar_id):
    conn, cur = crate_session()
    try:
        sql = "select * from avatar where avatar_id = %s"
        cur.execute(sql, (avatar_id,))
        row = cur.fetchone()
    finally:
        conn.close()

    return row['avatar_assistant_id'], row['avatar_thread_id']
