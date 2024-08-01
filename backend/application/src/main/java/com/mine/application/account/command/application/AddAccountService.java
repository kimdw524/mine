package com.mine.application.account.command.application;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountRepository;
import com.mine.application.account.converter.AccountDtoConverter;
import com.mine.application.account.infrastructure.ai.AccountAiChat;
import com.mine.application.account.infrastructure.ai.AddAccountDto;
import com.mine.application.account.ui.dto.AddAccountFromCalendarRequest;
import com.mine.application.account.ui.dto.AddAccountFromChatResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AddAccountService {

    private final SessionDao sessionDao;
    private final AccountRepository accountRepository;
    private final AccountAiChat accountAiChat;

    @Transactional
    public void addAccountFromCalendar(AddAccountFromCalendarRequest request) {
//        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
//                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        accountRepository.save(AccountDtoConverter.convert(request, 1));
    }

    @Transactional
    public AddAccountFromChatResponse addAccountFromChat(String query) {
//        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
//                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        AddAccountDto addAccountDto = accountAiChat.getAddAccountDtoFromQuery(query);

        Account account = AccountDtoConverter.convert(addAccountDto, 1);
        accountRepository.save(account);

        return AccountDtoConverter.convert(account);
    }

}
