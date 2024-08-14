package com.mine.socket.interceptor;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.Map;

@Slf4j
@Component
public class LoginCheckInterceptor implements ChannelInterceptor {


    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            // STOMP CONNECT 요청 시 HTTP 세션 접근
            Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
            HttpSession httpSession = (HttpSession) sessionAttributes.get(HttpSessionHandshakeInterceptor.HTTP_SESSION_ID_ATTR_NAME);

            if (httpSession != null) {
                log.info("login ID : {}", httpSession.getId());
            } else {
                // HTTP 세션이 없는 경우에 대한 처리
                throw new RuntimeException("login is required");
            }
        }

        return message;
    }
}
