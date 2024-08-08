package com.mine.socket.interceptor;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.Cookie;
import org.springframework.data.redis.core.BoundHashOperations;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class LoginCheckInterceptor implements HandshakeInterceptor {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String COOKIE_NAME = "SESSION";
    private static final String SESSION_KEY_PREFIX = "spring:session:sessions:";
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        log.info("headers : {}",request.getHeaders());
        String cookieStr = request.getHeaders().get("cookie").get(0);
        String[] cookies = cookieStr.split("; ");
        log.info("cookies : {}", List.of(cookies));

        String target = null;
        for(int i = 0 ; i < cookies.length; i++) {
            String[] cookieValues = cookies[i].split("=");
            String name = cookieValues[0];
            String value = cookieValues[1];

            if(name.equals(COOKIE_NAME)) {
                target = value;
            }
        }

        if(target == null) {
            return false;
        }

        String toEncoding = new String(Base64.getDecoder().decode(target));

        log.info("base64 to Encoding : {}",toEncoding);

        HashOperations<String, String, Object> stringObjectObjectHashOperations = redisTemplate.opsForHash();
        log.info("create Key : {}", SESSION_KEY_PREFIX+toEncoding);
        log.info("action");
        for( String key : stringObjectObjectHashOperations.keys(SESSION_KEY_PREFIX+toEncoding)) {
            log.info("keys : {} ", key);
        }
        Integer userId = (Integer) stringObjectObjectHashOperations.get(SESSION_KEY_PREFIX+toEncoding, "sessionAttr:USER_ID");
        log.info("userID : {}", userId);

        stringObjectObjectHashOperations.put(SESSION_KEY_PREFIX+toEncoding, "maxInactiveInterval", -1);
        attributes.put("httpSessionId", toEncoding);

//        stringObjectObjectHashOperations.put("spring:websocket:session:" , "maxInactiveInterval", -1);



//        log.info("session Id : {} ", httpSession.getId());
//        log.info("beforeHandshake : {} ", httpSession.getAttribute("USER_ID"));
//
//        if(httpSession.getAttribute("USER_ID") == null) {
//            return false;
//        }
//
//        httpSession.setMaxInactiveInterval(-1);
//
//        BoundSetOperations<String, Object> stringObjectBoundSetOperations = redisTemplate.boundSetOps("session-list");
//        //redis에 사용자 연결되었음을 저장함.
//        stringObjectBoundSetOperations.add(httpSession.getAttribute("USER_ID"));
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // TODO document why this method is empty
    }
}
