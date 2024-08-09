package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.AchievementState;
import com.mine.application.achievement.command.domain.AchievementStateRepository;
import com.mine.application.achievement.ui.dto.UpdateAchievementCountRequest;
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

    /*
    * 개발용
    * */
    public void updateAchievementCount(UpdateAchievementCountRequest request) {
        AchievementState achievementState = getAchievementStateOrElseThrow(request.getAchievementId());
        int newCount = request.getNewCount();
        if (newCount > achievementState.getAchievement().getAmount() || newCount < 0) {
            throw new RestApiException(CommonErrorCode.FORBIDDEN);
        }
        achievementState.tempChangeCountApi(newCount);
    }

    private AchievementState getAchievementStateOrElseThrow(int achievementId) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));

        return achievementStateRepository.findByUserIdAndAchievement_Id(userId, achievementId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
    }

}
