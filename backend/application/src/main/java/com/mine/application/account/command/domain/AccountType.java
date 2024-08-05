package com.mine.application.account.command.domain;

import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Getter
@NoArgsConstructor
public class AccountType {
    private Type type;

    @Getter
    public enum Type {
        SPEND("S"),
        INCOME("I"),
        ;

        private final String value;
        Type(String value) {
            this.value = value;
        }

    }

    public AccountType(Type type) {
        this.type = type;
    }

    public AccountType.Type getType() {
        return type;
    }

    public static AccountType of(String val) {
        if (val.equals("I")) {
            return new AccountType(Type.INCOME);
        } else if (val.equals("S")) {
            return new AccountType(Type.SPEND);
        }
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
        return type.equals(accountType.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(type.hashCode());
    }

}
