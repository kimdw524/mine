package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import org.springframework.stereotype.Component;

@Component
public class QuestionAchievementStateUpdater implements AchievementStateUpdater {

    @Override
    public int updateCount(AchievementState achievementState) {
        return 0;
    }

}
