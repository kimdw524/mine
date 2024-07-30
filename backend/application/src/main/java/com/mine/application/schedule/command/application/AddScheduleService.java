package com.mine.application.schedule.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.schedule.command.domain.Schedule;
import com.mine.application.schedule.command.domain.ScheduleRepository;
import com.mine.application.schedule.ui.dto.AddScheduleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AddScheduleService {

    private final SessionDao sessionDao;
    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void addSchedule(AddScheduleRequest request) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        scheduleRepository.save(Schedule.builder()
                .userId(userId)
                .categoryId(request.getCategoryId())
                .startDateTime(request.getStartTime())
                .endDateTime(request.getEndTime())
                .title(request.getTitle())
                .description(request.getDescription())
                .where(request.getWhere())
                .build());
    }

}
