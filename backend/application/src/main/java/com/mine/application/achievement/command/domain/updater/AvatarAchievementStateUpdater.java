package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import org.springframework.stereotype.Component;

@Component
public class AvatarAchievementStateUpdater implements AchievementStateUpdater {

    // TODO: DB에서 avatar 생성했는지 확인해야함.
    @Override
    public int updateCount(AchievementState achievementState) {
        return 1;
    }

}
