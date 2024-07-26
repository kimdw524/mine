package com.mine.application.user.ui;

import com.mine.application.user.command.application.*;
import com.mine.application.user.query.UserQueryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

    private final SignupService signupService;
    private final UserQueryService userQueryService;
    private final LoginService loginService;
    private final EmailVerificationService emailVerificationService;
    private final ModifyUserInfoService modifyUserInfoService;

    @PostMapping("/user")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest signupRequest) {
        signupService.signup(signupRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/help/user/{userEmail}")
    public ResponseEntity<?> existUserEmail(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok().body(userQueryService.existUserId(userEmail));
    }

    @PostMapping("/request-verification-email-code")
    public ResponseEntity<?> requestVerificationEmailCode(@RequestBody EmailVerificationNumRequest request) {
        emailVerificationService.emailNumberRequest(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-email-code")
    public ResponseEntity<?> verifyEmailCode(@RequestBody EmailVerificationRequest request) {
        if (emailVerificationService.verifyEmail(request)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        loginService.login(loginRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout() {
        loginService.logout();
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/help/password")
    public ResponseEntity<?> modifyPassword(@RequestBody @Valid ModifyPasswordRequest modifyPasswordRequest) {
        modifyUserInfoService.modifyPasswordByEmailValidation(modifyPasswordRequest);
        return ResponseEntity.accepted().build();
    }

}
