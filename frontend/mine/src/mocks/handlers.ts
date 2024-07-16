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
];

// 하나의 handler 로 관리
export const handlers = [...userHandler];
