package com.mine.application.user.command.application;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
