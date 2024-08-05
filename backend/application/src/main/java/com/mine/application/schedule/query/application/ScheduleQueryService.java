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

    public List<GetScheduleResponse> getSchedulesByCategory(
            Integer categoryId,
            LocalDate startDate,
            LocalDate endDate)
    {
        int userId = getUserIdOrElseThrow();
        return scheduleDataCustomRepository.findSchedulesByCategoryIdAndDates(
                userId,
                categoryId,
                startDate.atStartOfDay(),
                endDate.atTime(LocalTime.MAX).withNano(0)
        );
    }

    public List<GetScheduleResponse> searchSchedules(String query) {
        int userId = getUserIdOrElseThrow();
        return scheduleDataCustomRepository.findSchedulesByContaining(userId, query);
    }

    private int getUserIdOrElseThrow() {
        return (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));
    }

}
