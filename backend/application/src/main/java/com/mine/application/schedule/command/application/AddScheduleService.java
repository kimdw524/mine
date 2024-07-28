package com.mine.application.schedule.command.application;

import com.mine.application.schedule.command.domain.Schedule;
import com.mine.application.schedule.command.domain.ScheduleRepository;
import com.mine.application.schedule.ui.dto.AddScheduleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AddScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void addSchedule(AddScheduleRequest request) {
        scheduleRepository.save(Schedule.builder()
                .categoryId(request.getCategoryId())
                .startDateTime(request.getStartTime())
                .endDateTime(request.getEndTime())
                .title(request.getTitle())
                .description(request.getDescription())
                .where(request.getWhere())
                .build());
    }

}
