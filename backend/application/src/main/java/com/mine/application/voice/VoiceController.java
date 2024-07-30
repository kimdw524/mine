package com.mine.application.voice;

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
        return ResponseEntity.ok().build();
    }
}
