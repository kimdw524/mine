package com.mine.application.avatar.ui;

import com.mine.application.avatar.command.application.*;
import com.mine.application.avatar.query.application.SearchAvatarService;
import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
@RequestMapping("/avatars")
@RestController
public class AvatarController {

    private final RegisterAvatarService registerAvatarService;
    private final SearchAvatarService searchAvatarService;
    private final SessionDao sessionDao;
    private final DeleteAvatarService deleteAvatarService;
    private final ModifyAvatarService modifyAvatarService;

    @PostMapping("")
    @LoginCheck
    public ResponseEntity<?> addAvatar(@RequestBody RegisterAvatarRequest request) {
        registerAvatarService.generateAvatar(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("")
    @LoginCheck
    public ResponseEntity<?> getAvatars() {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        return ResponseEntity.ok(searchAvatarService.findAllAvatarByUserId(userId));
    }

    @DeleteMapping("/{avatarId}")
    @LoginCheck
    public ResponseEntity<?> deleteAvatar(@PathVariable Integer avatarId) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        deleteAvatarService.removeAvatar(avatarId, userId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{avatarId}")
    @LoginCheck
    public ResponseEntity<?> modifyAvatar(@PathVariable Integer avatarId, @RequestBody ModifyAvatarRequest request) {
        modifyAvatarService.modifyAvatar(avatarId, request);
        return ResponseEntity.accepted().build();
    }
}
