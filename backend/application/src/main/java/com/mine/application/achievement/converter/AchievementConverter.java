package com.mine.application.achievement.converter;

import com.mine.application.achievement.query.AchievementStateData;
import com.mine.application.achievement.ui.dto.GetAchievementStateResponse;
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
                .achieved_date(achievementStateData.getAchieved_date())
                .build();
    }

}
