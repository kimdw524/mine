package com.mine.application.avatar.command.domain;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarModel;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.user.command.domain.User;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AvatarService {

    private final AvatarRepository avatarRepository;

    public AvatarService(AvatarRepository avatarRepository) {
        this.avatarRepository = avatarRepository;
    }

    public Avatar createAvatar(String name, LocalDateTime birthday, String assistantId, String threadId, String voiceId, String residence, String job) {
        return avatarRepository.create(name, birthday, assistantId, threadId, voiceId, residence, job);
    }
}
