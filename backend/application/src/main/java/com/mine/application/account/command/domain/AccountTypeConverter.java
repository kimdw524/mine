package com.mine.application.account.command.domain;

import jakarta.persistence.AttributeConverter;

public class AccountTypeConverter implements AttributeConverter<AccountType, String> {

    @Override
    public String convertToDatabaseColumn(AccountType attribute) {
        return attribute.getCode();
    }

    @Override
    public AccountType convertToEntityAttribute(String dbData) {
        return AccountType.of(dbData);
    }

}
