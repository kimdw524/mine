package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.ui.dto.CreateAvatarRequest;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class CreateAvatarService {

    private final SessionDao sessionDao;
    private final AvatarRepository avatarRepository;

    public void createAvatar(CreateAvatarRequest request) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Avatar avatar = Avatar.builder()
                .userId(userId)
                .name(request.getName())
                .birthday(request.getBirthday())
                .personality(request.getPersonality())
                .assistantId(request.getAssistantId())
                .threadId(request.getThreadId())
                .voiceId(request.getVoiceId())
                .modelId(request.getModelId())
                .residence(request.getResidence())
                .job(request.getJob())
                .build();

        avatarRepository.save(avatar);
    }
}
