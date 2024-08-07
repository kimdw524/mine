package com.mine.application.avatar.ui;

import com.mine.application.avatar.command.application.Base64FileUploadRequest;
import com.mine.application.avatar.command.domain.voice.SpeechToText;
import com.mine.application.avatar.command.domain.voice.UploadVoiceService;
import com.mine.application.avatar.query.application.SearchAvatarVoiceService;
import com.mine.application.common.aop.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/avatars/{avatarId}/voice")
@RequiredArgsConstructor
public class VoiceController {
    private final SearchAvatarVoiceService searchAvatarVoiceService;
    private final UploadVoiceService uploadVoiceService;

    @PostMapping("")
    public ResponseEntity<String> updateVoiceFile(@RequestBody Base64FileUploadRequest request) {
        return ResponseEntity.ok().body(uploadVoiceService.updateVoice(request));
    }

    @GetMapping("")
    @LoginCheck
    public ResponseEntity<?> getVoiceId(@PathVariable Integer avatarId) {
        return ResponseEntity.ok(searchAvatarVoiceService.getVoice(avatarId));
    }
}
