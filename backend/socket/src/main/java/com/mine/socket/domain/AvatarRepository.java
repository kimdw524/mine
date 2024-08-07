package com.mine.socket.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
@RequiredArgsConstructor
public class AvatarRepository {
    private final JdbcTemplate jdbcTemplate;

    public AvatarData getAvatarInfo(Integer avatarId) {
        String sql = "SELECT avatar_assistant_id as assistantId, avatar_thread_id as threadId, avatar_id as avatarId, user_id as userId, avatar_name as avatarName FROM avatar WHERE avatar_id = ?";

        return jdbcTemplate.queryForObject(sql, new RowMapper<AvatarData>() {
            @Override
            public AvatarData mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new AvatarData(
                        rs.getString("assistantId"),
                        rs.getString("threadId"),
                        rs.getInt("avatarId"),
                        rs.getString("avatarName"),
                        rs.getInt("userId")
                );
            }
        }, avatarId);
    }
}
