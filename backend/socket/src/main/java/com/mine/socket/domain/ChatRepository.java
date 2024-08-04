package com.mine.socket.domain;

import com.github.f4b6a3.uuid.UuidCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@RequiredArgsConstructor
@Repository
public class ChatRepository {
    private final JdbcTemplate jdbcTemplate;

    public int save(Chat chatData) {
        return jdbcTemplate.update("INSERT INTO chat (chat_id, user_id, avatar_id, chat_category_id, created_at, chat_content, chat_role, chat_type, sended_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                chatData.uuidToBytes(), chatData.getUserId(), chatData.getAvatarId(), chatData.getChatCategoryId(), chatData.getCreated_at(), chatData.getChatContent(), chatData.getChatRole(),  chatData.getChatType(), chatData.getSendedAt());
    }

    public static UUID nextId() {
        return UuidCreator.getTimeOrderedEpoch();
    }
}
