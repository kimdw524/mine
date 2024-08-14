package com.mine.application.account.command.domain;

import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Objects;

@Getter
@RequiredArgsConstructor
public class AccountType {
    private final String code;

    public static final AccountType INCOME = new AccountType("I");
    public static final AccountType SPEND = new AccountType("S");

    public String getCode(String code) {
        return code;
    }

    public static AccountType of(String code) {
        if ("I".equals(code)) return INCOME;
        if ("S".equals(code)) return SPEND;
        throw new RestApiException(CommonErrorCode.INVALID_PARAMETER);
    }

    @Override
    public boolean equals(Object obj) {
        if(obj == this) {
            return true;
        }
        if(obj == null || obj.getClass() != this.getClass()) {
            return false;
        }
        AccountType accountType = (AccountType) obj;
        return code.equals(accountType.getCode());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(code.hashCode());
    }

}
