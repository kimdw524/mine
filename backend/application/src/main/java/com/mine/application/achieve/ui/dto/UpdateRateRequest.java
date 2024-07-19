package com.mine.application.achieve.ui.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
public class UpdateRateRequest {

    @NotBlank
    private int sortID;

    @NotBlank
    private String username;

}
