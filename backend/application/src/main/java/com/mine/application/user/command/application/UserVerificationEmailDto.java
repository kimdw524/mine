package com.mine.application.user.command.application;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserVerificationEmailDto implements Serializable {
    private static final long serialVersionUID = -2003632380209941855L;
    private String email;
    private String verificationNumber;
    private boolean isValid;

    public boolean verify(String verificationNumber) {
        isValid = this.verificationNumber.equals(verificationNumber);
        return isValid;
    }

    public boolean canUse() {
        return isValid;
    }
}
