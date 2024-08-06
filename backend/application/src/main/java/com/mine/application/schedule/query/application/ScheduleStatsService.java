package com.mine.application.schedule.query.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.schedule.query.domain.ScheduleStatsCustomRepository;
import com.mine.application.schedule.ui.dto.GetScheduleStatsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ScheduleStatsService {

    private final SessionDao sessionDao;
    private final ScheduleStatsCustomRepository scheduleStatsCustomRepository;

    public List<GetScheduleStatsResponse> getScheduleStats(
            LocalDate startDate,
            LocalDate endDate
    ) {
        int userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));
        return scheduleStatsCustomRepository.findScheduleStats(
                userId,
                startDate.atStartOfDay(),
                endDate.atTime(LocalTime.MAX)
        );
    }

}
