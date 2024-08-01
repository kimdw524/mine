package com.mine.application.user.ui;

import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.user.command.application.ModifyPasswordRequest;
import com.mine.application.user.command.application.ModifyUserInfoRequest;
import com.mine.application.user.command.application.ModifyUserInfoService;
import com.mine.application.user.query.PasswordDto;
import com.mine.application.user.query.UserQueryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Validated
@RequestMapping("/user")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true")
public class UserController {
    private final UserQueryService userQueryService;
    private final ModifyUserInfoService modifyUserInfoService;
    private final SessionDao sessionDao;

    @GetMapping("/info")
    @LoginCheck
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.ok().body(userQueryService.getUserData((String) sessionDao.get(SessionConstants.EMAIL).get()));
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
}
