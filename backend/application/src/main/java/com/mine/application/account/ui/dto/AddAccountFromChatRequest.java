package com.mine.application.account.ui.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AddAccountFromChatRequest {

    @NotBlank
    private String query;

}
