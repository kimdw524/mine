package com.mine.application.schedule.query.domain;

import com.mine.application.schedule.ui.dto.GetScheduleResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleDataCustomRepository {

    List<GetScheduleResponse> findSchedulesByCategoryIdAndDates(Integer userId, Integer categoryId, LocalDateTime startDate, LocalDateTime endDate);

    List<GetScheduleResponse> findSchedulesByContaining(Integer userId, String query);

}
