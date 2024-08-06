package com.mine.application.account.ui;

import com.mine.application.account.query.application.AccountStatsService;
import com.mine.application.account.ui.dto.GetSpendAccountStatsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/users/statistics/account")
@RequiredArgsConstructor
@RestController
public class AccountStatsController {

    private final AccountStatsService accountStatsService;

    @GetMapping("/spend")
    public ResponseEntity<List<GetSpendAccountStatsResponse>> getSpendAccountStats(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok()
                .body(accountStatsService.getSpendAccountStats(startDate, endDate));
    }

    @GetMapping("/income")
    public ResponseEntity<Long> getIncomeAccountStats(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok()
                .body(accountStatsService.getIncomeAccountStats(startDate, endDate));
    }

}
