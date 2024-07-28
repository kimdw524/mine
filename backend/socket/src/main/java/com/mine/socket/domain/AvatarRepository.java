package com.mine.socket.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AvatarRepository {
    private final JdbcTemplate jdbcTemplate;

    public AvatarData getAvatarInfo(Integer avatarId) {
        return jdbcTemplate.queryForObject("SELECT avatar_assistant_id as avatarAssistantId, avatar_thread_id as avatarThreadId, avatar_id as avatarId, user_id as userId, avatar_name as avaterName FROM avatar WHERE avatar_id = ?", AvatarData.class, avatarId);
    }
}
