package com.mine.application.account.ui;

import com.mine.application.account.query.application.AccountAnalysisService;
import com.mine.application.account.query.application.AccountStatsService;
import com.mine.application.account.ui.dto.GetSpendAccountStatsResponse;
import com.mine.application.common.aop.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/users/statistics/account")
@RequiredArgsConstructor
@RestController
public class AccountStatsController {

    private final AccountStatsService accountStatsService;
    private final AccountAnalysisService accountAnalysisService;

    @LoginCheck
    @GetMapping("/spend")
    public ResponseEntity<List<GetSpendAccountStatsResponse>> getSpendAccountStats(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok()
                .body(accountStatsService.getSpendAccountStats(startDate, endDate));
    }

    @LoginCheck
    @GetMapping("/income")
    public ResponseEntity<Long> getIncomeAccountStats(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok()
                .body(accountStatsService.getIncomeAccountStats(startDate, endDate));
    }

    @LoginCheck
    @GetMapping("/spend/analysis")
    public ResponseEntity<String> getSpendAccountAnalysis(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok().body(accountAnalysisService.getSpendAccountAnalysis(startDate, endDate));
    }

    @LoginCheck
    @GetMapping("/income/analysis")
    public ResponseEntity<String> getIncomeAccountAnalysis(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok().body(accountAnalysisService.getIncomeAccountAnalysis(startDate, endDate));
    }

}
