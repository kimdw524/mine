package com.mine.application.avatar.ui;

import com.mine.application.avatar.command.application.Base64FileUploadRequest;
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
    public ResponseEntity<?> updateVoiceFile(@RequestBody Base64FileUploadRequest request) {
        uploadVoiceService.updateVoice(request);
        /** TODO : 채팅 카테고리가 일반이면 그냥 채팅 서버에 저장시키고
         * 아래는 채팅 카테고리 리스트임.
         * 가계등록 :
         * 가계검색 :
         * 일정검색 :
         * 일정등록 :
         */
        return ResponseEntity.ok().build();
    }

    @GetMapping("")
    @LoginCheck
    public ResponseEntity<?> getVoiceId(@PathVariable Integer avatarId) {
        return ResponseEntity.ok(searchAvatarVoiceService.getVoice(avatarId));
    }
}
