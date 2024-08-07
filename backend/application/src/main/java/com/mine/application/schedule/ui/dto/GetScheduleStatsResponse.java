package com.mine.application.schedule.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetScheduleStatsResponse {

    private int categoryId;

    private long count;

}
