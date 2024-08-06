package com.mine.application.account.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetSpendAccountStatsResponse {

    private int spendCategoryId;

    private long categorySum;

}
