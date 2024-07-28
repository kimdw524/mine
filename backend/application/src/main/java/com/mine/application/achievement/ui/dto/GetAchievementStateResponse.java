package com.mine.application.achievement.ui.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetAchievementStateResponse {

    private int achievementId;

    private String title;

    private String description;

    private int amount;

    private int count;

    private LocalDateTime date;

}
