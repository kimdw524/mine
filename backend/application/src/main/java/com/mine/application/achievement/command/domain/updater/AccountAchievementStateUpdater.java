package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import org.springframework.stereotype.Component;

@Component
public class AccountAchievementStateUpdater implements AchievementStateUpdater {

    @Override
    public int updateCount(AchievementState achievementState) {
        return updateAccountCount(achievementState);
    }

    private int updateAccountCount(AchievementState achievementState) {
        return achievementState.getCount() + 1;
    }

}
