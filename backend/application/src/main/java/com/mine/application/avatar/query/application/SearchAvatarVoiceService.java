package com.mine.application.avatar.query.application;

import com.mine.application.avatar.command.domain.voice.Voice;
import com.mine.application.avatar.query.domain.AvatarDataRepository;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SearchAvatarVoiceService {
    private final AvatarDataRepository avatarDataRepository;
    private final SessionDao sessionDao;
    public Voice getVoice(Integer avatarId) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        return avatarDataRepository.findVoiceByUserIdAndAvatarId(userId, avatarId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
    }
}
