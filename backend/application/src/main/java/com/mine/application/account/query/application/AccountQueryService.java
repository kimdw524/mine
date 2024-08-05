package com.mine.application.account.query.application;

import com.mine.application.account.command.domain.AccountType;
import com.mine.application.account.query.domain.AccountDataCustomRepository;
import com.mine.application.account.ui.dto.GetAccountResponse;
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
public class AccountQueryService {

    private final SessionDao sessionDao;
    private final AccountDataCustomRepository accountDataCustomRepository;

    public List<GetAccountResponse> getAllAccounts(
            LocalDate startDate,
            LocalDate endDate)
    {
        int userId = getUserIdOrElseThrow();
        return accountDataCustomRepository.findAccountsByDatesAndCategory(
                userId,
                null,
                null,
                getStartOfDay(startDate),
                getEndOfDay(endDate)
        );
    }

    public List<GetAccountResponse> getIncomeAccounts(
            LocalDate startDate,
            LocalDate endDate)
    {
        int userId = getUserIdOrElseThrow();
        return accountDataCustomRepository.findAccountsByDatesAndCategory(
                userId,
                AccountType.INCOME.getCode(),
                null,
                getStartOfDay(startDate),
                getEndOfDay(endDate)
        );
    }

    public List<GetAccountResponse> getSpendAccountsByCategory(
            Integer categoryId,
            LocalDate startDate,
            LocalDate endDate)
    {
        int userId = getUserIdOrElseThrow();
        return accountDataCustomRepository.findAccountsByDatesAndCategory(
                userId,
                AccountType.SPEND.getCode(),
                categoryId,
                getStartOfDay(startDate),
                getEndOfDay(endDate)
        );
    }

    public List<GetAccountResponse> searchAccounts(String query) {
        int userId = getUserIdOrElseThrow();
        return accountDataCustomRepository.findAccountsByContaining(userId, query);
    }

    private int getUserIdOrElseThrow() {
        return (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));
    }

    private LocalDateTime getStartOfDay(LocalDate date) {
        return date.atStartOfDay();
    }

    private LocalDateTime getEndOfDay(LocalDate date) {
        return date.atTime(LocalTime.MAX);
    }

}
