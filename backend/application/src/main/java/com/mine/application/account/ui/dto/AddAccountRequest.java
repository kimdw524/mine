package com.mine.application.account.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddAccountRequest {

    private Integer spendCategoryId;

    @NotBlank
    private String accountType;

    @NotNull
    private Long money;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime dateTime;

}
