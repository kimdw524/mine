package com.mine.application.user.ui;

import com.mine.application.user.command.application.SignupRequest;
import com.mine.application.user.command.application.SignupService;
import com.mine.application.user.query.UserQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

    private final SignupService signupService;
    private final UserQueryService userQueryService;

    @PostMapping("/user")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        signupService.signup(signupRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/help/user/{userId}")
    public ResponseEntity<?> existUserId(@PathVariable("userId") String userId) {
        return ResponseEntity.ok().body(userQueryService.existUserId(userId));
    }
}
