package com.mine.application.account.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateAccountRequest {

    @NotBlank
    private Integer accountId;

    private Integer spendCategoryId;

    @NotBlank
    private String accountType;

    @NotBlank
    private Long money;

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime dateTime;

}
