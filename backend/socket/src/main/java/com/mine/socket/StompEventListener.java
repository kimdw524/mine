package com.mine.socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
public class StompEventListener {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String WEBSOCKET_SESSION_PREFIX = "websocket:sessions:";
    private static final String SESSION_KEY_PREFIX = "spring:session:sessions:";

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String webSocketSessionId = accessor.getSessionId();
        String httpSessionId = (String) accessor.getSessionAttributes().get("httpSessionId");

        if (httpSessionId != null || webSocketSessionId != null) {
            // Redis에 WebSocket ID와 HttpSession ID 저장
            HashOperations<String, String, Object> hashOperations =  redisTemplate.opsForHash();
            hashOperations.put(WEBSOCKET_SESSION_PREFIX + webSocketSessionId, "httpSessionId", httpSessionId);

            log.info("WebSocket session established. WebSocketSessionId: {}, HttpSessionId: {}", webSocketSessionId, httpSessionId);
        } else {
            log.warn("HttpSessionId not found in WebSocket session attributes.");
        }
    }

    @EventListener
    public void handleWebsocketDisconnectListener(SessionDisconnectEvent event) {
        HashOperations<String, Object, Object> stringObjectObjectHashOperations = redisTemplate.opsForHash();
        String sessionId = event.getSessionId();
        String httpSessionId = (String) stringObjectObjectHashOperations.get(WEBSOCKET_SESSION_PREFIX+sessionId, "httpSessionId");
        stringObjectObjectHashOperations.put(SESSION_KEY_PREFIX+httpSessionId, "maxInactiveInterval", 86400);
        redisTemplate.delete(WEBSOCKET_SESSION_PREFIX+sessionId);
        log.info("session is disconnected : {} , httpSessionId : {} ", sessionId, httpSessionId);
    }
}
