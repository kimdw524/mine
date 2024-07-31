package com.mine.application.account.query.domain;

import com.mine.application.account.ui.dto.GetAccountResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface AccountDataCustomRepository {

    List<GetAccountResponse> findAccountsBetweenDates(Integer userId, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<GetAccountResponse> findAccountsByContaining(Integer userId, String query);

}
