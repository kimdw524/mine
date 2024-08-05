package com.mine.application.schedule.converter;

import com.mine.application.schedule.command.domain.Schedule;
import com.mine.application.schedule.infrastructure.ai.AddScheduleDto;
import com.mine.application.schedule.ui.dto.AddScheduleByCalendarRequest;
import com.mine.application.schedule.ui.dto.AddScheduleByChatResponse;

public class ScheduleDtoConverter {

    public static Schedule convert(AddScheduleByCalendarRequest request, int userId) {
        return Schedule.builder()
                .userId(userId)
                .categoryId(request.getCategoryId())
                .startDateTime(request.getStartDateTime())
                .endDateTime(request.getEndDateTime())
                .title(request.getTitle())
                .description(request.getDescription())
                .where(request.getWhere())
                .build();
    }

    public static Schedule convert(AddScheduleDto addScheduleDto, int userId) {
        return Schedule.builder()
                .userId(userId)
                .categoryId(1)
                .startDateTime(addScheduleDto.getStartDateTime())
                .endDateTime(addScheduleDto.getEndDateTime())
                .title(addScheduleDto.getTitle())
                .description(addScheduleDto.getDescription())
                .where(addScheduleDto.getWhere())
                .build();
    }

    public static AddScheduleByChatResponse convert(Schedule schedule) {
        return AddScheduleByChatResponse.builder()
                .scheduleId(schedule.getId())
                .categoryId(schedule.getCategoryId())
                .startDateTime(schedule.getStartDateTime())
                .endDateTime(schedule.getEndDateTime())
                .title(schedule.getTitle())
                .description(schedule.getDescription())
                .where(schedule.getWhere())
                .build();
    }

}
