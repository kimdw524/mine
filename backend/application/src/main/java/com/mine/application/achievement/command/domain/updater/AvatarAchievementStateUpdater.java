package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import com.mine.application.avatar.query.domain.AvatarData;
import com.mine.application.avatar.query.domain.AvatarDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class AvatarAchievementStateUpdater implements AchievementStateUpdater {

    private final AvatarDataRepository avatarDataRepository;

    @Override
    public int updateCount(AchievementState achievementState) {
        return updateAvatarCount(achievementState);
    }

    private int updateAvatarCount(AchievementState achievementState) {
        int userId = achievementState.getUserId();
        List<AvatarData> avatars = avatarDataRepository.findAllByUserId(userId);
        return avatars.isEmpty() ? 0 : 1;
    }

}
