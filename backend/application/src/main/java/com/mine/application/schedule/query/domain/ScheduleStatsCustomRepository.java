package com.mine.application.schedule.query.domain;

import com.mine.application.schedule.ui.dto.GetScheduleStatsResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleStatsCustomRepository {

    List<GetScheduleStatsResponse> findScheduleStats(Integer userId, LocalDateTime startDateTime, LocalDateTime endDateTime);

}
