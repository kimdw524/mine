package com.mine.application.avatar.command.domain.voice;

import com.mine.application.avatar.command.application.Base64FileUploadRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/voice")
@RequiredArgsConstructor
public class VoiceController {

    private final UploadVoiceService uploadVoiceService;



    @PostMapping("")
    public ResponseEntity<?> uploadVoiceFile(@RequestBody Base64FileUploadRequest request) {
        uploadVoiceService.uploadFile(request);
        /** TODO : 채팅 카테고리가 일반이면 그냥 채팅 서버에 저장시키고
         * 아래는 채팅 카테고리 리스트임.
         * 가계등록 :
         * 가계검색 :
         * 일정검색 :
         * 일정등록 :
         */
        return ResponseEntity.ok().build();
    }
}
