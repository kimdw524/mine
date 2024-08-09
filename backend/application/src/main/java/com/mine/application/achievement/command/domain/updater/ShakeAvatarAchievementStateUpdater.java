package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import org.springframework.stereotype.Component;

@Component
public class ShakeAvatarAchievementStateUpdater implements AchievementStateUpdater {

    @Override
    public int updateCount(AchievementState achievementState) {
        return updateShakeAvatarCount(achievementState);
    }

    private int updateShakeAvatarCount(AchievementState achievementState) {
        return 1;
    }

}
