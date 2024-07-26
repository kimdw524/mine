package com.mine.application.user.command.application;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserVerificationEmailDto implements Serializable {
    private String email;
    private String verificationNumber;

    public boolean verify(String verificationNumber) {
        return this.verificationNumber.equals(verificationNumber);
    }
}
