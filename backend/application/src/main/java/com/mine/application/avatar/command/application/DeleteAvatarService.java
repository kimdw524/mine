package com.mine.application.avatar.command.application;
// 세션에서 사용자 ID 를 가져와서 해당 사용자와 일치하는 아바타를 삭제 상태로 설정하고 저장

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DeleteAvatarService {

    private final SessionDao sessionDao;
    private final AvatarRepository avatarRepository;

    public void deleteAvatar(Integer avatarId) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Avatar avatar = avatarRepository.findByIdAndUserId(avatarId, userId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        avatar.delete();
        avatarRepository.save(avatar);
    }
}