package com.mine.application.account.command.application;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountRepository;
import com.mine.application.account.command.domain.AccountType;
import com.mine.application.account.ui.dto.AddAccountRequest;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class AddAccountService {

    private final SessionDao sessionDao;
    private final AccountRepository accountRepository;

    @Transactional
    public void addAccount(AddAccountRequest request) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        accountRepository.save(Account.builder()
                .userId(userId)
                .spendCategoryId(request.getSpendCategoryId())
                .accountType(AccountType.of(request.getAccountType()))
                .money(request.getMoney())
                .title(request.getTitle())
                .description(request.getDescription())
                .dateTime(request.getDateTime())
                .createdAt(LocalDateTime.now())
                .build());
    }

}
