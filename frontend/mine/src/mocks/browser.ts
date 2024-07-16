import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 작성한 handler 들을 기반으로 움직일 worker 설정
// service worker 기반
export const worker = setupWorker(...handlers);
