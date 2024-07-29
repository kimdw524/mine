package com.mine.application.schedule.query.domain;

import com.mine.application.schedule.ui.dto.GetSchedulesResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleDataCustomRepository {

    List<GetSchedulesResponse> findAllBetweenDates(Integer userId, LocalDateTime startDate, LocalDateTime endDate);

}
