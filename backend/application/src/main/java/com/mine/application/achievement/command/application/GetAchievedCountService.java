package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.AchievementStateRepository;
import com.mine.application.achievement.ui.dto.GetAchievedCountResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GetAchievedCountService {

    private final SessionDao sessionDao;
    private final AchievementStateRepository achievementStateRepository;

    public GetAchievedCountResponse getAchievedCount() {
        int userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));
        long count = achievementStateRepository.countAchievementStateByUserIdAndIsAchieved(userId, true);
        return new GetAchievedCountResponse(count);
    }

}
