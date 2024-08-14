package com.mine.application.account.query.domain;

import com.mine.application.account.ui.dto.GetSpendAccountStatsResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface AccountStatsCustomRepository {

    List<GetSpendAccountStatsResponse> findSpendAccountStats(Integer userId, LocalDateTime startDateTime, LocalDateTime endDateTime);

    Long findIncomeAccountStats(Integer userId, LocalDateTime startDateTime, LocalDateTime endDateTime);

}
