package com.mine.application.account.command.application;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountRepository;
import com.mine.application.account.infrastructure.ai.AccountAiChat;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class GetAccountByChatService {

    private final SessionDao sessionDao;
    private final AccountRepository accountRepository;
    private final AccountAiChat accountAiChat;

    public String getAccountsByChat(String query) {
        int userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        List<Account> accounts = accountRepository.findAllByUserId(userId);
        return accountAiChat.getJsonFromQuery(query, accounts);
    }

}
