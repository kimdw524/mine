package com.mine.application.account.query.application;

import com.mine.application.account.query.domain.AccountStatsCustomRepository;
import com.mine.application.account.ui.dto.GetSpendAccountStatsResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AccountStatsService {

    private final SessionDao sessionDao;
    private final AccountStatsCustomRepository accountStatsCustomRepository;

    public List<GetSpendAccountStatsResponse> getSpendAccountStats(
            LocalDate startDate,
            LocalDate endDate
    ) {
        int userId = getUserIdOrElseThrow();
        return accountStatsCustomRepository.findSpendAccountStats(
                userId,
                getStartOfDay(startDate),
                getEndOfDay(endDate)
        );
    }

    public Long getIncomeAccountStats(
            LocalDate startDate,
            LocalDate endDate
    ) {
        int userId = getUserIdOrElseThrow();
        return accountStatsCustomRepository.findIncomeAccountStats(
                userId,
                getStartOfDay(startDate),
                getEndOfDay(endDate)
        );
    }

    private int getUserIdOrElseThrow() {
        return (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));
    }

    private LocalDateTime getStartOfDay(LocalDate date) {
        return date.atStartOfDay();
    }

    private LocalDateTime getEndOfDay(LocalDate date) {
        return date.atTime(LocalTime.MAX).withNano(0);
    }

}
