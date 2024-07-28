package com.mine.application.avatar.command.domain;

import org.springframework.data.repository.Repository;

import java.time.LocalDateTime;

public interface AvatarRepository extends Repository<Avatar, Integer> {

    void save(Avatar avatar);

    default Avatar create(String name, LocalDateTime birthday, String assistantId, String threadId, String voiceId, String residence, String job) {
        Avatar avatar = new Avatar(name, birthday, assistantId, threadId, voiceId, residence, job);
        save(avatar);
        return avatar;
    }
}
