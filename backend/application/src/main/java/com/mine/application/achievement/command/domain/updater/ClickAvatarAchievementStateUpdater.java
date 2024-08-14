package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import org.springframework.stereotype.Component;

@Component
public class ClickAvatarAchievementStateUpdater implements AchievementStateUpdater {

    @Override
    public int updateCount(AchievementState achievementState) {
        return updateClickAvatarCount(achievementState);
    }

    private int updateClickAvatarCount(AchievementState achievementState) {
        return 1;
    }

}
