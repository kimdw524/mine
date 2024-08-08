package com.mine.application.account.query.application;

import com.mine.application.account.infrastructure.ai.AccountAiChat;
import com.mine.application.account.query.domain.AccountStatsCustomRepository;
import com.mine.application.account.ui.dto.GetSpendAccountStatsResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AccountAnalysisService {

    private final SessionDao sessionDao;
    private final AccountStatsCustomRepository accountStatsCustomRepository;
    private final AccountAiChat accountAiChat;

    public String getSpendAccountAnalysis(
            LocalDate startDate,
            LocalDate endDate
    ) {
        Map<String, LocalDate> prevStartAndEnd = getPrevStartAndEnd(startDate, endDate);
        LocalDate prevStartDate = prevStartAndEnd.get("start");
        LocalDate prevEndDate = prevStartAndEnd.get("end");

        int userId = getUserIdOrElseThrow();
        List<GetSpendAccountStatsResponse> currStats = accountStatsCustomRepository.findSpendAccountStats(userId, getStartOfDay(startDate), getEndOfDay(endDate));
        if (currStats.isEmpty()) return null;
        List<GetSpendAccountStatsResponse> prevStats = accountStatsCustomRepository.findSpendAccountStats(userId, getStartOfDay(prevStartDate), getEndOfDay(prevEndDate));

        return accountAiChat.getSpendAccountAnalysis(
                getPeriodText(startDate, endDate),
                currStats,
                prevStats
        );
    }

    public String getIncomeAccountAnalysis(
            LocalDate startDate,
            LocalDate endDate
    ) {
        Map<String, LocalDate> prevStartAndEnd = getPrevStartAndEnd(startDate, endDate);
        LocalDate prevStartDate = prevStartAndEnd.get("start");
        LocalDate prevEndDate = prevStartAndEnd.get("end");

        int userId = getUserIdOrElseThrow();
        Long currStats = accountStatsCustomRepository.findIncomeAccountStats(userId, getStartOfDay(startDate), getEndOfDay(endDate));
        if (currStats == null) return null;
        Long prevStats = accountStatsCustomRepository.findIncomeAccountStats(userId, getStartOfDay(prevStartDate), getEndOfDay(prevEndDate));

        return accountAiChat.getIncomeAccountAnalysis(
                getPeriodText(startDate, endDate),
                currStats,
                prevStats
        );
    }

    private int getUserIdOrElseThrow() {
        return (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));
    }

    private Map<String, LocalDate> getPrevStartAndEnd(LocalDate startDate, LocalDate endDate) {
        Map<String, LocalDate> periodRange = new HashMap<>();
        LocalDate periodStart;
        LocalDate periodEnd;

        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);
        if (daysBetween <= 6) {
            periodStart = startDate.minusWeeks(1).with(DayOfWeek.MONDAY);
            periodEnd = endDate.minusWeeks(1).with(DayOfWeek.SUNDAY);
        } else if (daysBetween <= 31) {
            periodStart = startDate.minusMonths(1).with(TemporalAdjusters.firstDayOfMonth());
            periodEnd = endDate.minusMonths(1).with(TemporalAdjusters.lastDayOfMonth());
        } else {
            periodStart = startDate.minusYears(1).with(TemporalAdjusters.firstDayOfYear());
            periodEnd = endDate.minusYears(1).with(TemporalAdjusters.lastDayOfYear());
        }
        periodRange.put("start", periodStart);
        periodRange.put("end", periodEnd);

        return periodRange;
    }

    private String getPeriodText(LocalDate startDate, LocalDate endDate) {
        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);
        if (daysBetween <= 6) return "주";
        if (daysBetween <= 31) return "달";
        return "년";
    }

    private LocalDateTime getStartOfDay(LocalDate date) {
        return date.atStartOfDay();
    }

    private LocalDateTime getEndOfDay(LocalDate date) {
        return date.atTime(LocalTime.MAX).withNano(0);
    }

}
