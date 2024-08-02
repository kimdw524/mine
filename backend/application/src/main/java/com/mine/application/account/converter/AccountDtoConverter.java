package com.mine.application.account.converter;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountType;
import com.mine.application.account.infrastructure.ai.AddAccountDto;
import com.mine.application.account.ui.dto.AddAccountFromCalendarRequest;
import com.mine.application.account.ui.dto.AddAccountFromChatResponse;

import java.time.LocalDateTime;

public final class AccountDtoConverter {

    public static Account convert(AddAccountFromCalendarRequest request, int userId) {
        return Account.builder()
                .userId(userId)
                .spendCategoryId(request.getSpendCategoryId())
                .accountType(AccountType.of(request.getAccountType()))
                .money(request.getMoney())
                .title(request.getTitle())
                .description(request.getDescription())
                .dateTime(request.getDateTime())
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static Account convert(AddAccountDto addAccountDto, int userId) {
        return Account.builder()
                .userId(userId)
                .spendCategoryId(1)
                .accountType(AccountType.of(addAccountDto.getAccountType()))
                .money(addAccountDto.getMoney())
                .title(addAccountDto.getTitle())
                .description(addAccountDto.getDescription())
                .dateTime(addAccountDto.getDateTime())
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static AddAccountFromChatResponse convert(Account account) {
        return AddAccountFromChatResponse.builder()
                .accountId(account.getId())
                .spendCategoryId(account.getSpendCategoryId())
                .accountType(account.getAccountType().getType().getValue())
                .money(account.getMoney())
                .title(account.getTitle())
                .description(account.getDescription())
                .dateTime(account.getDateTime())
                .build();
    }

}
