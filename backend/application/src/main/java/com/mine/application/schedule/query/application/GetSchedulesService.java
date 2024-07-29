package com.mine.application.schedule.query.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
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

    private final SessionDao sessionDao;
    private final ScheduleDataCustomRepository scheduleDataCustomRepository;

    public List<GetSchedulesResponse> getSchedulesBetweenDates(
            LocalDate startDate,
            LocalDate endDate)
    {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        return scheduleDataCustomRepository.findSchedulesBetweenDates(
                userId,
                startDate.atStartOfDay(),
                endDate.atTime(LocalTime.MAX)
        );
    }

}
