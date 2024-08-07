package com.mine.application.account.command.application;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountRepository;
import com.mine.application.account.converter.AccountDtoConverter;
import com.mine.application.account.infrastructure.ai.AccountAiChat;
import com.mine.application.account.infrastructure.ai.AddAccountDto;
import com.mine.application.account.ui.dto.AddAccountByCalendarRequest;
import com.mine.application.account.ui.dto.AddAccountByChatResponse;
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
    public void addAccountByCalendar(AddAccountByCalendarRequest request) {
        int userId = getUserIdOrElseThrow();
        accountRepository.save(AccountDtoConverter.convert(request, userId));
    }

    @Transactional
    public AddAccountByChatResponse addAccountByChat(String query) {
        AddAccountDto addAccountDto = accountAiChat.getAddAccountDtoFromQuery(query);

        int userId = getUserIdOrElseThrow();
        Account account = AccountDtoConverter.convert(addAccountDto, userId);
        accountRepository.save(account);

        return AccountDtoConverter.convert(account);
    }

    private int getUserIdOrElseThrow() {
        return (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));

    }

}
