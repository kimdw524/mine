package com.mine.application.avatar.ui;

import com.mine.application.avatar.command.application.CreateAvatarService;
import com.mine.application.avatar.ui.dto.CreateAvatarRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/avatars")
@RequiredArgsConstructor
public class AvatarController {

    private final CreateAvatarService createAvatarService;

    @PostMapping
    public ResponseEntity<Void> createAvatar(@RequestBody CreateAvatarRequest request) {
        createAvatarService.createAvatar(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
