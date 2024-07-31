package com.mine.application.avatar.command.application;
// 세션에서 사용자 ID를 가져와 아바타를 생성하고 저장
import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.ui.dto.CreateAvatarRequest;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

// @RequiredArgsConstructor -> 생성자를 통해 final 필드들을 초기화해줌
@RequiredArgsConstructor
@Service
public class CreateAvatarService {

    private final SessionDao sessionDao;
    private final AvatarRepository avatarRepository;

    // 세션에서 userId를 가져오고 존재하지 않으면 예외던지기
    public void createAvatar(CreateAvatarRequest request) {
//        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
//                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        // 빌더 패턴으로 생성
        Avatar avatar = Avatar.builder()
                .userId(1)
                .name(request.getName())
                .birthday(LocalDateTime.now())
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
