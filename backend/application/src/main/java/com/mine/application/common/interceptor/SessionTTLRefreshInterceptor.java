package com.mine.application.common.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class SessionTTLRefreshInterceptor implements HandlerInterceptor {
    @Autowired
    private HttpSession httpSession;

    @Value("${spring.session.expire-seconds}") private Integer expireSeconds;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(httpSession.getMaxInactiveInterval() != -1) { // 세션이 연결되지 않은 상태라면,
            httpSession.setMaxInactiveInterval(expireSeconds);
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
