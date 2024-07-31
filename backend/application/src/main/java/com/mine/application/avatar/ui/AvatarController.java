package com.mine.application.avatar.ui;
// HTTP 요청을 처리하고 아바타 생성 서비스를 호출하는 컨트롤러 클래스
import com.mine.application.avatar.command.application.RegisterAvatarRequest;
import com.mine.application.avatar.command.application.RegisterAvatarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/avatar")
@RestController
public class AvatarController {

    private final RegisterAvatarService registerAvatarService;

    @PostMapping("")
    public ResponseEntity<?> addAvatar(@RequestBody RegisterAvatarRequest request) {
        registerAvatarService.createAvatar(request);
        return ResponseEntity.ok().build();
    }
}
