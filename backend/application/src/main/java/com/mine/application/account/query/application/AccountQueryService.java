package com.mine.application.account.query.application;

import com.mine.application.account.query.domain.AccountDataCustomRepository;
import com.mine.application.account.ui.dto.GetAccountResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AccountQueryService {

    private final SessionDao sessionDao;
    private final AccountDataCustomRepository accountDataCustomRepository;

    public List<GetAccountResponse> getAccountsBetweenDates(
            LocalDate startDate,
            LocalDate endDate)
    {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        return accountDataCustomRepository.findAccountsBetweenDates(
                userId,
                startDate.atStartOfDay(),
                endDate.atTime(LocalTime.MAX)
        );
    }

    public List<GetAccountResponse> getAccountsByContaining(String query) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        return accountDataCustomRepository.findAccountsByContaining(userId, query);
    }

}
