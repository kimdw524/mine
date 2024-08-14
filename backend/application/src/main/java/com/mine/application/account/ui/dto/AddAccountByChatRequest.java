package com.mine.application.account.ui.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AddAccountByChatRequest {

    @NotBlank
    private String query;

}
