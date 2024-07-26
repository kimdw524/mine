package com.mine.application.user.command.application;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignupRequest {
    @NotNull
    @Pattern(regexp = "^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\\.[A-za-z0-9\\-]+")
    private String email;
    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$")
    private String password;
    @NotNull
    private String nickname;
    @NotNull
    private String gender;
}
