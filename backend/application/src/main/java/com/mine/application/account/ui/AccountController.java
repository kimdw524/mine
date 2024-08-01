package com.mine.application.account.ui;

import com.mine.application.account.command.application.*;
import com.mine.application.account.query.application.AccountQueryService;
import com.mine.application.account.ui.dto.*;
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
@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true")
public class AccountController {

    private final AccountQueryService accountQueryService;
    private final GetAccountByChatService getAccountByChatService;
    private final AddAccountService addAccountService;
    private final UpdateAccountService updateAccountService;
    private final DeleteAccountService deleteAccountService;
    private final GetSpendCategoryService getSpendCategoryService;

    @GetMapping("/users/accounts")
    public ResponseEntity<List<GetAccountResponse>> getAccountsBetweenDates(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate)
    {
        return ResponseEntity.ok().body(accountQueryService.getAccountsBetweenDates(startDate, endDate));
    }

    @GetMapping("/users/accounts/calendar")
    public ResponseEntity<List<GetAccountResponse>> getAccountsByContaining(@RequestParam String query) {
        return ResponseEntity.ok(accountQueryService.getAccountsByContaining(query));
    }

    @ResponseBody
    @GetMapping("/users/accounts/chat")
    public ResponseEntity<String> getAccountsByChat(@RequestParam String query) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(getAccountByChatService.getAccountsByChat(query));
    }

    @PostMapping("/users/accounts/calendar")
    public ResponseEntity<Void> addAccountFromCalendar(@RequestBody @Valid AddAccountFromCalendarRequest addAccountFromCalendarRequest) {
        addAccountService.addAccountFromCalendar(addAccountFromCalendarRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/accounts/chat")
    public ResponseEntity<AddAccountFromChatResponse> addAccountFromChat(@RequestBody @Valid AddAccountFromChatRequest addAccountFromChatRequest) {
        return ResponseEntity.ok().body(addAccountService.addAccountFromChat(addAccountFromChatRequest.getQuery()));
    }

    @PatchMapping("/users/account")
    public ResponseEntity<Void> updateAccount(@RequestBody @Valid UpdateAccountRequest updateAccountRequest) {
        updateAccountService.updateAccount(updateAccountRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/accounts/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable @NotNull Integer accountId) {
        deleteAccountService.deleteAccount(accountId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/account/spend-category/{spendCategoryId}")
    public ResponseEntity<?> getSpendCategory(@PathVariable @NotNull Integer spendCategoryId) {
        return ResponseEntity.ok().body(getSpendCategoryService.getSpendCategory(spendCategoryId));
    }

}
