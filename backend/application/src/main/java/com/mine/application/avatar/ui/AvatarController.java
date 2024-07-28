package com.mine.application.avatar.ui;

import com.mine.application.avatar.command.application.CreateAvatarService;
import com.mine.application.avatar.ui.dto.CreateAvatarRequest;
import com.mine.application.common.aop.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/user/avatar")
@RestController
public class AvatarController {

    private final CreateAvatarService createAvatarService;

    @LoginCheck
    @PostMapping
    public ResponseEntity<Void> createAvatar(@RequestBody CreateAvatarRequest request) {
        createAvatarService.createAvatar(request);
        return ResponseEntity.ok().build();
    }
}
