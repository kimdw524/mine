package com.mine.application.schedule.ui.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AddScheduleFromChatRequest {

    @NotBlank
    private String query;

}
