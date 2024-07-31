package com.mine.application.achievement.ui.dto;

import com.mine.application.achievement.query.AchievementStateData;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AchievementConverter {

    public static GetAchievementStateResponse convert(AchievementStateData achievementStateData) {
        return GetAchievementStateResponse.builder()
                .achievementId(achievementStateData.getAchievement().getId())
                .title(achievementStateData.getAchievement().getTitle())
                .description(achievementStateData.getAchievement().getDescription())
                .amount(achievementStateData.getAchievement().getAmount())
                .count(achievementStateData.getCount())
                .date(achievementStateData.getDate())
                .build();
    }

}
