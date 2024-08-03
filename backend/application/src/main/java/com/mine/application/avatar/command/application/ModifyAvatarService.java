package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ModifyAvatarService {
    private final AvatarRepository avatarRepository;
    private final SessionDao sessionDao;

    @Transactional
    public void modifyAvatar(Integer avatarId, ModifyAvatarRequest request) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        Avatar avatar = avatarRepository.findById(avatarId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if(!avatar.getUserId().equals(userId)) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }
        avatar.modifyAvatarInfo(request);
    }
}
