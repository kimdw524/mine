package com.mine.application.schedule.query.domain;

import com.mine.application.schedule.ui.dto.GetScheduleResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleDataCustomRepository {

    List<GetScheduleResponse> findSchedulesBetweenDates(Integer userId, LocalDateTime startDate, LocalDateTime endDate);

    List<GetScheduleResponse> findSchedulesByContaining(Integer userId, String query);

}
