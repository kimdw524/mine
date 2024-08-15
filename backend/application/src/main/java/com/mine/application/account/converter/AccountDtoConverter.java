package com.mine.application.account.converter;

import com.mine.application.account.command.domain.Account;
import com.mine.application.account.command.domain.AccountType;
import com.mine.application.account.infrastructure.ai.AddAccountDto;
import com.mine.application.account.ui.dto.AddAccountByCalendarRequest;
import com.mine.application.account.ui.dto.AddAccountByChatResponse;

import java.time.LocalDateTime;

public final class AccountDtoConverter {

    public static Account convert(AddAccountByCalendarRequest request, int userId) {
        Integer categoryId = getCategoryIdOrNullByAccountType(request.getAccountType(), request.getSpendCategoryId());
        return Account.builder()
                .userId(userId)
                .spendCategoryId(categoryId)
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
                .spendCategoryId(addAccountDto.getSpendCategoryId())
                .accountType(AccountType.of(addAccountDto.getAccountType()))
                .money(addAccountDto.getMoney())
                .title(addAccountDto.getTitle())
                .description(addAccountDto.getDescription())
                .dateTime(addAccountDto.getDateTime())
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static AddAccountByChatResponse convert(Account account) {
        return AddAccountByChatResponse.builder()
                .accountId(account.getId())
                .spendCategoryId(account.getSpendCategoryId())
                .accountType(account.getAccountType().getCode())
                .money(account.getMoney())
                .title(account.getTitle())
                .description(account.getDescription())
                .dateTime(account.getDateTime())
                .build();
    }

    private static Integer getCategoryIdOrNullByAccountType(String accountType, Integer spendCategoryId) {
        return "I".equals(accountType) ? null : spendCategoryId;
    }

}
