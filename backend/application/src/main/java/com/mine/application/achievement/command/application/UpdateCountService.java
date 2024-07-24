package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.AchievementState;
import com.mine.application.achievement.command.domain.AchievementStateRepository;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UpdateCountService {

    private final SessionDao sessionDao;
    private final AchievementStateRepository achievementStateRepository;

    @Transactional
    public boolean updateCount(int achievementId) {
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
        String email = (String) sessionDao.get(SessionConstants.EMAIL).get();
        return achievementStateRepository.findBySortIdAndUsername(email, achievementId)
                .orElseThrow();
    }

}
