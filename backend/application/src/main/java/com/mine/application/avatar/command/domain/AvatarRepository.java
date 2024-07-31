package com.mine.application.avatar.command.domain;
// 아바타 객체를 데이터베이스에 저장하고 생성하는 리포지토리 인터페이스
import org.springframework.data.repository.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface AvatarRepository extends Repository<Avatar, Integer> {

    void save(Avatar avatar);

    Optional<Avatar> findByIdAndUserId(Integer id, Integer userId);

    default Avatar create(Integer userId, String name, LocalDateTime birthday, String personality, String assistantId, String threadId, String voiceId, Integer modelId, String residence, String job) {
        Avatar avatar = new Avatar(userId, name, birthday, personality, assistantId, threadId, voiceId, modelId, residence, job);
        save(avatar);
        return avatar;
    }
}
