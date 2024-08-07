package com.mine.socket.config;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.session.Session;
import org.springframework.session.SessionRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.Duration;

@Slf4j
@Component
public class WebSocketConnectionEventHandler implements ApplicationListener<SessionConnectEvent> {
    @Autowired
    private SessionRepository sessionRepository;

    @Value("${spring.session.expire-seconds}")
    private Integer expireSeconds;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public void onApplicationEvent(SessionConnectEvent event) {

    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        Session session = sessionRepository.findById(event.getSessionId());
        if(session == null) {
            return;
        }
        log.info("websocket disconnect : {}", session.getId());
        session.setMaxInactiveInterval(Duration.ofSeconds(expireSeconds));

        //redisTemplate에서 사용자 삭제
        BoundSetOperations<String, Object> stringObjectBoundSetOperations = redisTemplate.boundSetOps("session-list");
        stringObjectBoundSetOperations.remove(session.getAttribute("USER_ID"));
    }
}
