package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class DeleteAvatarService {
    private final AvatarRepository avatarRepository;

    @Transactional
    public void removeAvatar(Integer avatarId, Integer userId) {
        Avatar avatar = avatarRepository.findAvatarInAllDataByIdAndUserId(avatarId, userId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        avatar.delete();
    }
}
