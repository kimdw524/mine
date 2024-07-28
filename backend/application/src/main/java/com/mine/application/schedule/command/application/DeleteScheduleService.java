package com.mine.application.schedule.command.application;

import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.schedule.command.domain.Schedule;
import com.mine.application.schedule.command.domain.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class DeleteScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void deleteSchedule(int scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        scheduleRepository.delete(schedule);
    }

}
