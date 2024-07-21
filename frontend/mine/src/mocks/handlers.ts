import { http, HttpResponse } from "msw";


// mocking 할 API handler
// 종류에 따라 분류하면 됨
const userHandler = [
  http.get("/user", () => {
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),

  http.post("/user/login", async ({ request }) => {
    const result: any = await request.json();
    const data = {
      accessToken: "오늘도 파이팅",
      email: "",
      password: "",
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
        statusText: "quthentication_failed",
      });
    }
  }),

  http.post('/user/logout', () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      // headers: {
      //   'Set-Cookie': 'authToken=abc-123',
      // }
    })
  }),
];

// 하나의 handler 로 관리
export const handlers = [...userHandler];
