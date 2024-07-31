package com.mine.application.schedule.query.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.schedule.query.domain.ScheduleDataCustomRepository;
import com.mine.application.schedule.ui.dto.GetScheduleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ScheduleQueryService {

    private final SessionDao sessionDao;
    private final ScheduleDataCustomRepository scheduleDataCustomRepository;

    public List<GetScheduleResponse> getSchedulesBetweenDates(
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

    public List<GetScheduleResponse> getSchedulesByContaining(String query) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        return scheduleDataCustomRepository.findSchedulesByContaining(userId, query);
    }

}
