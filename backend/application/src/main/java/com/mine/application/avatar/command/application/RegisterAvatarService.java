package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.AvatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class RegisterAvatarService {
    private final AvatarRepository avatarRepository;

    @Transactional
    public void createAvatar(RegisterAvatarRequest request) {

    }
}
