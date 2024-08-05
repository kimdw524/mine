package com.mine.application.account.command.application;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountRepository;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class DeleteAccountService {

    private final SessionDao sessionDao;
    private final AccountRepository accountRepository;

    @Transactional
    public void deleteAccount(int accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        validateWriterElseThrow(account);
        accountRepository.delete(account);
    }

    private void validateWriterElseThrow(Account account) {
        int userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));

        if (userId != account.getUserId()) {
            throw new RestApiException(CommonErrorCode.FORBIDDEN);
        }
    }

}
