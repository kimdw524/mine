package com.mine.application.user.ui;

import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.user.query.UserQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Validated
@RequestMapping("/user")
@RestController
public class UserController {
    private final UserQueryService userQueryService;
    private final SessionDao sessionDao;

    @GetMapping("/info")
    @LoginCheck
    public ResponseEntity<?> getUserInfo() {
        return ResponseEntity.ok().body(userQueryService.getUserData((String) sessionDao.get(SessionConstants.EMAIL).get()));
    }

}
