package com.mine.application.schedule.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
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

    private final SessionDao sessionDao;
    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void deleteSchedule(int scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        validateWriterOrElseThrow(schedule);
        scheduleRepository.delete(schedule);
    }

    private void validateWriterOrElseThrow(Schedule schedule) {
        int userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));

        if (userId != schedule.getUserId()) {
            throw new RestApiException(CommonErrorCode.FORBIDDEN);
        }
    }

}
