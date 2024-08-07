package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import org.springframework.stereotype.Component;

@Component
public class ScheduleAchievementStateUpdater implements AchievementStateUpdater {

    @Override
    public int updateCount(AchievementState achievementState) {
        return updateScheduleCount(achievementState);
    }

    private int updateScheduleCount(AchievementState achievementState) {
        return achievementState.getCount() + 1;
    }

}
