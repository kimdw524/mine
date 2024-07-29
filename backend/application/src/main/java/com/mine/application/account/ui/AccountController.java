package com.mine.application.account.ui;

import com.mine.application.account.command.application.AddAccountService;
import com.mine.application.account.command.application.DeleteAccountService;
import com.mine.application.account.command.application.UpdateAccountService;
import com.mine.application.account.query.application.AccountQueryService;
import com.mine.application.account.ui.dto.AddAccountRequest;
import com.mine.application.account.ui.dto.GetAccountResponse;
import com.mine.application.account.ui.dto.UpdateAccountRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/users/accounts")
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

    @GetMapping("/calendar")
    public ResponseEntity<List<GetAccountResponse>> getSchedulesByContaining(@RequestParam String query) {
        return ResponseEntity.ok(accountQueryService.getAccountsByContaining(query));
    }

    @PostMapping("/calendar")
    public ResponseEntity<Void> addAccount(@RequestBody @Valid AddAccountRequest addAccountRequest) {
        addAccountService.addAccount(addAccountRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping
    public ResponseEntity<Void> updateAccount(@RequestBody @Valid UpdateAccountRequest updateAccountRequest) {
        updateAccountService.updateAccount(updateAccountRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable @NotBlank int accountId) {
        deleteAccountService.deleteAccount(accountId);
        return ResponseEntity.ok().build();
    }

}
