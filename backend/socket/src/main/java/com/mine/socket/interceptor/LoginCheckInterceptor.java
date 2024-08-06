package com.mine.socket.interceptor;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Slf4j
@Component
public class LoginCheckInterceptor implements HandshakeInterceptor {

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;


    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        log.info("session Id : {} ", httpSession.getId());
        log.info("beforeHandshake : {} ", httpSession.getAttribute("USER_ID"));

        if(httpSession.getAttribute("USER_ID") == null) {
            return false;
        }

        httpSession.setMaxInactiveInterval(-1);

        BoundSetOperations<String, Object> stringObjectBoundSetOperations = redisTemplate.boundSetOps("session-list");
        //redis에 사용자 연결되었음을 저장함.
        stringObjectBoundSetOperations.add(httpSession.getAttribute("USER_ID"));
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // TODO document why this method is empty
    }
}
