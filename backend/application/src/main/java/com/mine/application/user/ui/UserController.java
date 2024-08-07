package com.mine.application.user.ui;

import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.user.command.application.*;
import com.mine.application.user.query.UserData;
import com.mine.application.user.query.UserQueryService;
import com.mine.application.user.ui.dto.GetUserInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Validated
@RequestMapping("/user")
@RestController
@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
public class UserController {
    private final UserQueryService userQueryService;
    private final ModifyUserInfoService modifyUserInfoService;
    private final SessionDao sessionDao;
    private final EmailVerificationService emailVerificationService;

    @GetMapping("/info")
    @LoginCheck
    public ResponseEntity<?> getUserInfo() {
        UserData user = userQueryService.getUserData((String) sessionDao.get(SessionConstants.EMAIL).get());
        GetUserInfoResponse response = GetUserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .gender("M".equals(user.getGender()) ? "남성" : "여성")
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/info")
    @LoginCheck
    public ResponseEntity<?> updateUserInfo(@RequestBody ModifyUserInfoRequest request) {
        modifyUserInfoService.modifyUserInfo(request);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("")
    @LoginCheck
    public ResponseEntity<?> deleteUser() {
        modifyUserInfoService.withdraw();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/request-verification-email-code")
    @LoginCheck
    public ResponseEntity<?> requestEmail(@RequestBody EmailVerificationNumRequest request) {
        emailVerificationService.emailNumberRequestForSame(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-email-code")
    @LoginCheck
    public ResponseEntity<?> modifyPasswordRequest(@RequestBody ModifyPasswordRequest request) {
        modifyUserInfoService.modifyPasswordBySession(request);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/password")
    public ResponseEntity<?> verifyEmail(@RequestBody EmailVerificationRequest request) {
        emailVerificationService.emailVerifyForSession(request);
        return ResponseEntity.accepted().build();
    }

}
