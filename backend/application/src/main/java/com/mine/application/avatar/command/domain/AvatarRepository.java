package com.mine.application.avatar.command.domain;

import org.springframework.data.repository.Repository;

import java.time.LocalDateTime;

public interface AvatarRepository extends Repository<Avatar, Integer> {

    void save(Avatar avatar);

    default Avatar create(Integer userId, String name, LocalDateTime birthday, String personality, String assistantId, String threadId, String voiceId, Integer modelId, String residence, String job) {
        Avatar avatar = new Avatar(userId, name, birthday, personality, assistantId, threadId, voiceId, modelId, residence, job);
        save(avatar);
        return avatar;
    }
}
