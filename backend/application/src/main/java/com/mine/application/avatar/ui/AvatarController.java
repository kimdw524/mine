package com.mine.application.avatar.ui;
// HTTP 요청을 처리하고 아바타 생성 서비스를 호출하는 컨트롤러 클래스
import com.mine.application.avatar.command.application.CreateAvatarService;
import com.mine.application.avatar.ui.dto.CreateAvatarRequest;
import com.mine.application.avatar.command.application.UpdateAvatarService;
import com.mine.application.avatar.command.application.DeleteAvatarService;
import com.mine.application.avatar.ui.dto.UpdateAvatarRequest;
import com.mine.application.common.aop.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/user/avatar")
@RestController
public class AvatarController {

    private final CreateAvatarService createAvatarService;
    private final UpdateAvatarService updateAvatarService;
    private final DeleteAvatarService deleteAvatarService;

//    @LoginCheck
    @PostMapping
    public ResponseEntity<Void> createAvatar(@RequestBody CreateAvatarRequest request) {
        createAvatarService.createAvatar(request);
        return ResponseEntity.ok().build();
    }

//    @LoginCheck
    @PutMapping
    public ResponseEntity<Void> updateAvatar(@RequestBody UpdateAvatarRequest request) {
        updateAvatarService.updateAvatar(request);
        return ResponseEntity.ok().build();
    }

//    @LoginCheck
    @DeleteMapping("/{avatarId}")
    public ResponseEntity<Void> deleteAvatar(@PathVariable Integer avatarId) {
        deleteAvatarService.deleteAvatar(avatarId);
        return ResponseEntity.ok().build();
    }

}
