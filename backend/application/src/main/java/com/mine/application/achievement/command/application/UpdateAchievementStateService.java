package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.AchievementState;
import com.mine.application.achievement.command.domain.AchievementStateRepository;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UpdateAchievementStateService {

    private final SessionDao sessionDao;
    private final AchievementStateRepository achievementStateRepository;

    @Transactional
    public boolean updateAchievementState(int achievementId) {
        AchievementState achievementState = getAchievementStateOrElseThrow(achievementId);
        if (achievementState.isAchieved()) {
            return false;
        }

        int updatedCount = UpdaterMapper.getUpdaterOrElseThrow(achievementId)
                .updateCount(achievementState);
        achievementState.changeCount(updatedCount);

        return achievementState.isAchieved();
    }

    private AchievementState getAchievementStateOrElseThrow(int achievementId) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));

        return achievementStateRepository.findByUserIdAndAchievement_Id(userId, achievementId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
    }

}
