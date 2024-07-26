package com.mine.application.user.command.application;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
public class SignupRequest {
    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String nickname;
    @NotNull
    private String gender;
}
