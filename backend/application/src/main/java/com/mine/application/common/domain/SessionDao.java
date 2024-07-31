package com.mine.application.common.domain;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SessionDao {
    @Autowired
    private HttpSession httpSession;

    public void put(SessionConstants key, Object value) {
        httpSession.setAttribute(key.name(), value);
    }
    public Optional<Object> get(SessionConstants key) {
        return Optional.ofNullable(httpSession.getAttribute(key.name()));
    }

    public void remove(SessionConstants key) {
        httpSession.removeAttribute(key.name());
    }

    public void removeAll() {
        httpSession.invalidate();
    }
}
