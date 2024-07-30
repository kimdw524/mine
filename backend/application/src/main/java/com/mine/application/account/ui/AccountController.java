package com.mine.application.account.ui;

import com.mine.application.account.command.application.AddAccountService;
import com.mine.application.account.command.application.DeleteAccountService;
import com.mine.application.account.command.application.UpdateAccountService;
import com.mine.application.account.query.application.AccountQueryService;
import com.mine.application.account.ui.dto.AddAccountRequest;
import com.mine.application.account.ui.dto.GetAccountResponse;
import com.mine.application.account.ui.dto.UpdateAccountRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class AccountController {

    private final AccountQueryService accountQueryService;
    private final AddAccountService addAccountService;
    private final UpdateAccountService updateAccountService;
    private final DeleteAccountService deleteAccountService;

    @GetMapping
    public ResponseEntity<List<GetAccountResponse>> getAccountsBetweenDates(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate)
    {
        return ResponseEntity.ok().body(accountQueryService.getAccountsBetweenDates(startDate, endDate));
    }

    @GetMapping("/accounts/calendar")
    public ResponseEntity<List<GetAccountResponse>> getSchedulesByContaining(@RequestParam String query) {
        return ResponseEntity.ok(accountQueryService.getAccountsByContaining(query));
    }

    @PostMapping("/accounts/calendar")
    public ResponseEntity<Void> addAccount(@RequestBody @Valid AddAccountRequest addAccountRequest) {
        addAccountService.addAccount(addAccountRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/account")
    public ResponseEntity<Void> updateAccount(@RequestBody @Valid UpdateAccountRequest updateAccountRequest) {
        updateAccountService.updateAccount(updateAccountRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/accounts/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable @NotNull Integer accountId) {
        deleteAccountService.deleteAccount(accountId);
        return ResponseEntity.ok().build();
    }

}
