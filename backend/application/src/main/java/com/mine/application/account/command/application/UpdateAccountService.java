package com.mine.application.account.command.application;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountRepository;
import com.mine.application.account.ui.dto.UpdateAccountRequest;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UpdateAccountService {

    private final SessionDao sessionDao;
    private final AccountRepository accountRepository;

    @Transactional
    public void updateAccount(UpdateAccountRequest request) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        validateWriterElseThrow(account);
        account.updateAccount(request);
    }

    private void validateWriterElseThrow(Account account) {
        int userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));

        if (userId != account.getUserId()) {
            throw new RestApiException(CommonErrorCode.FORBIDDEN);
        }
    }

}
