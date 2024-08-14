package com.mine.application.achievement.ui.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UpdateAchievementCountRequest {

    @NotNull
    private int achievementId;

    @NotNull
    private int newCount;

}
