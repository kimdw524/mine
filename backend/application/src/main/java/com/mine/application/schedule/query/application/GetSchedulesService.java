package com.mine.application.schedule.query.application;

import com.mine.application.schedule.query.domain.ScheduleDataCustomRepository;
import com.mine.application.schedule.ui.dto.GetSchedulesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GetSchedulesService {

    private final ScheduleDataCustomRepository scheduleDataCustomRepository;

    public List<GetSchedulesResponse> getSchedulesBetweenDates(
            LocalDate startDate,
            LocalDate endDate)
    {
        System.out.println(startDate.atStartOfDay() + " " + endDate.atTime(LocalTime.MAX));
        return scheduleDataCustomRepository.findAllBetweenDates(
                1,
                startDate.atStartOfDay(),
                endDate.atTime(LocalTime.MAX)
        );
    }

}
