package com.mine.application.account.infrastructure.ai;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AddAccountDto {

    @JsonProperty("spendCategoryId")
    private int spendCategoryId;

    @JsonProperty("accountType")
    private String accountType;

    @JsonProperty("money")
    private Long money;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("dateTime")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateTime;

}
