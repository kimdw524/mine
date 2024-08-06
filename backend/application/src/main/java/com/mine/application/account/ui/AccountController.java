package com.mine.application.account.ui;

import com.mine.application.account.command.application.*;
import com.mine.application.account.query.application.AccountQueryService;
import com.mine.application.account.ui.dto.*;
import com.mine.application.common.aop.LoginCheck;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
public class AccountController {

    private final AccountQueryService accountQueryService;
    private final GetAccountByChatService getAccountByChatService;
    private final AddAccountService addAccountService;
    private final UpdateAccountService updateAccountService;
    private final DeleteAccountService deleteAccountService;
    private final GetSpendCategoryService getSpendCategoryService;

    @LoginCheck
    @GetMapping("/users/accounts")
    public ResponseEntity<List<GetAccountResponse>> getAllAccounts(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate)
    {
        return ResponseEntity.ok().body(accountQueryService.getAllAccounts(startDate, endDate));
    }

    @LoginCheck
    @GetMapping("/users/accounts/income")
    public ResponseEntity<List<GetAccountResponse>> getIncomeAccounts(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate)
    {
        return ResponseEntity.ok().body(accountQueryService
                .getIncomeAccounts(startDate, endDate));
    }

    @LoginCheck
    @GetMapping("/users/accounts/spend")
    public ResponseEntity<List<GetAccountResponse>> getSpendAccountsByCategory(
            @RequestParam @Nullable Integer spendCategoryId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate)
    {
        return ResponseEntity.ok()
                .body(accountQueryService.getSpendAccountsByCategory(spendCategoryId, startDate, endDate));
    }

    @LoginCheck
    @GetMapping("/users/accounts/calendar")
    public ResponseEntity<List<GetAccountResponse>> searchAccounts(@RequestParam String query) {
        return ResponseEntity.ok(accountQueryService.searchAccounts(query));
    }

    @LoginCheck
    @GetMapping("/users/accounts/chat")
    public ResponseEntity<String> getAccountsByChat(@RequestParam String query) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(getAccountByChatService.getAccountsByChat(query));
    }

    @LoginCheck
    @PostMapping("/users/accounts/calendar")
    public ResponseEntity<Void> addAccountByCalendar(@RequestBody @Valid AddAccountByCalendarRequest addAccountByCalendarRequest) {
        addAccountService.addAccountByCalendar(addAccountByCalendarRequest);
        return ResponseEntity.ok().build();
    }

    @LoginCheck
    @PostMapping("/users/accounts/chat")
    public ResponseEntity<AddAccountByChatResponse> addAccountByChat(
            @RequestBody @Valid AddAccountByChatRequest addAccountByChatRequest)
    {
        return ResponseEntity.ok()
                .body(addAccountService.addAccountByChat(addAccountByChatRequest.getQuery()));
    }

    @LoginCheck
    @PatchMapping("/users/account")
    public ResponseEntity<Void> updateAccount(
            @RequestBody @Valid UpdateAccountRequest updateAccountRequest)
    {
        updateAccountService.updateAccount(updateAccountRequest);
        return ResponseEntity.ok().build();
    }

    @LoginCheck
    @DeleteMapping("/users/accounts/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable @NotNull Integer accountId) {
        deleteAccountService.deleteAccount(accountId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/account/spend-category/{spendCategoryId}")
    public ResponseEntity<String> getSpendCategory(@PathVariable @NotNull Integer spendCategoryId) {
        return ResponseEntity.ok().body(getSpendCategoryService.getSpendCategory(spendCategoryId));
    }

}
