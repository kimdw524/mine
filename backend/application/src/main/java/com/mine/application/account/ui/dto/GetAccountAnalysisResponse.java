package com.mine.application.account.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetAccountAnalysisResponse {

    private long prevSum;

    private String analysis;

}
