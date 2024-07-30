package com.mine.application.avatar.command.application;
// 세션에서 사용자 ID를 가져와서 해당 사용자와 일치하는 아바타를 수정하고 저장
import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.ui.dto.UpdateAvatarRequest;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UpdateAvatarService {

    private final SessionDao sessionDao;
    private final AvatarRepository avatarRepository;

    public void updateAvatar(UpdateAvatarRequest request) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Avatar avatar = avatarRepository.findByIdAndUserId(request.getAvatarId(), userId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        avatar.update(request.getName(), request.getBirthday(), request.getPersonality(), request.getVoiceId(), request.getModelId(), request.getResidence(), request.getJob());

        avatarRepository.save(avatar);
    }
}