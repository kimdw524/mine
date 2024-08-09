package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import org.springframework.stereotype.Component;

@Component
public class ChatAchievementStateUpdate implements AchievementStateUpdater {

    @Override
    public int updateCount(AchievementState achievementState) {
        return updateChatCount(achievementState);
    }

    private int updateChatCount(AchievementState achievementState) {
        return 1;
    }

}
