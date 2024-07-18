package com.mine.application.user.ui;

import com.mine.application.user.command.application.LoginRequest;
import com.mine.application.user.command.application.LoginService;
import com.mine.application.user.command.application.SignupRequest;
import com.mine.application.user.command.application.SignupService;
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

    @PostMapping("/user")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest signupRequest) {
        signupService.signup(signupRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/help/user/{userEmail}")
    public ResponseEntity<?> existuserEmail(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok().body(userQueryService.existUserId(userEmail));
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
}
