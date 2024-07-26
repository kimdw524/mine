import { http, delay, HttpResponse } from 'msw';

// mocking 할 API handler
// 종류에 따라 분류하면 됨
const userHandler = [
  http.get('/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),

  http.post('/user/login', async ({ request }) => {
    const result: any = await request.json();
    const data = {
      accessToken: '오늘도 파이팅',
      email: '',
      password: '',
    };

    if (result?.email && result?.password) {
      return (
        (data.email = result.email),
        (data.password = result.password),
        new HttpResponse(JSON.stringify(data), {
          status: 200,
          // headers: {
          //   'Set-Cookie': 'authToken=abc-123',
          // }
        })
      );
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'quthentication_failed',
      });
    }
  }),

  http.post('/user/logout', () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      // headers: {
      //   'Set-Cookie': 'authToken=abc-123',
      // }
    });
  }),
];

const mypageHandler = [
  http.get('/mypage/userinfo', async () => {
    await delay(1000);

    return HttpResponse.json({
      email: 'ssafy@gmaill.com',
      nickname: '닉네임입니다',
      gender: '남성',
    });
  }),
  http.get('/mypage/nickname', async () => {
    await delay(500);

    return HttpResponse.json({
      nickname: '닉네임입니다',
    });
  }),
  http.get('/mypage/nicknames', ({ request }) => {
    const url = new URL(request.url);
    const nick = url.searchParams.get('nick');

    if (nick === 'duplicate') {
      return HttpResponse.json(
        { msg: '중복된 닉네임입니다.' },
        { status: 409 },
      );
    } else {
      return HttpResponse.json(
        { msg: '사용 가능한 닉네임입니다.' },
        { status: 200 },
      );
    }
  }),
  http.patch('/mypage/nickname', () => {
    return HttpResponse.json(
      { msg: '닉네임이 성공적으로 변경되었습니다.' },
      { status: 200 },
    );
  }),
  http.post('/mypage/password/code', () => {
    return HttpResponse.json({ msg: '코드 전송' }, { status: 200 });
  }),
  http.post('/mypage/password/verify', () => {
    return HttpResponse.json({ msg: '인증 성공' }, { status: 200 });
  }),
  http.post('/mypage/password', () => {
    return HttpResponse.json({ msg: '변경 성공' }, { status: 200 });
  }),
  http.get('/mypage/achievement', async () => {
    await delay(1000);

    return HttpResponse.json({
      achievement: [
        {
          achievement_id: 1,
          achievement_title: '업적1',
          achievement_description: '업적1 설명',
          achievement_required_amount: 10,
          achievement_count: 10,
          achievement_date: '2024-07-26',
          is_achieved: true,
        },
        {
          achievement_id: 2,
          achievement_title: '업적2',
          achievement_description: '업적2 설명',
          achievement_required_amount: 10,
          achievement_count: 8,
          achievement_date: null,
          is_achieved: false,
        },
        {
          achievement_id: 3,
          achievement_title: '업적3',
          achievement_description: '업적3 설명',
          achievement_required_amount: 10,
          achievement_count: 6,
          achievement_date: null,
          is_achieved: false,
        },
        {
          achievement_id: 4,
          achievement_title: '업적4',
          achievement_description: '업적4 설명',
          achievement_required_amount: 10,
          achievement_count: 4,
          achievement_date: null,
          is_achieved: false,
        },
        {
          achievement_id: 5,
          achievement_title: '업적5',
          achievement_description: '업적5 설명',
          achievement_required_amount: 10,
          achievement_count: 2,
          achievement_date: null,
          is_achieved: false,
        },
      ],
    });
  }),
];

const avatarHandler = [
  http.get('/avatar/questions', async () => {
    await delay(1000);

    return HttpResponse.json([
      {
        questionId: 1,
        description:
          '1. 여행을 좋아하나요? 좋아한다면, 주로 가고 싶은 여행지 유형은 무엇인가요?',
        choices: ['1번', '2번', '3번'],
      },
      {
        questionId: 2,
        description: '2. 2번 질문?',
        choices: ['10번', '20번', '30번'],
      },
      {
        questionId: 3,
        description: '3번 질문',
        choices: ['100번', '200번', '300번'],
      },
    ]);
  }),
  http.get('/avatar/subjectives', async () => {
    await delay(1000);

    return HttpResponse.json([
      {
        questionId: 1,
        description:
          '1. 여행을 좋아하나요? 좋아한다면, 주로 가고 싶은 여행지 유형은 무엇인가요?',
      },
      {
        questionId: 2,
        description: '2. 2번 질문?',
      },
      {
        questionId: 3,
        description: '3번 질문',
      },
    ]);
  }),
  http.get('/avatar/sentences', async () => {
    await delay(1000);

    return HttpResponse.json([
      {
        sentenceId: 1,
        description:
          '여행을 좋아하나요? 좋아한다면, 주로 가고 싶은 여행지 유형은 무엇인가요?',
      },
      {
        sentenceId: 2,
        description:
          '가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사',
      },
      {
        sentenceId: 3,
        description:
          'ABCDEFG1245678ABCDEFG1245678ABCDEFG1245678ABCDEFG1245678ABCDEFG1245678',
      },
    ]);
  }),
];

// 하나의 handler 로 관리
export const handlers = [...userHandler, ...mypageHandler, ...avatarHandler];
