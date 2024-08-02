package com.mine.application.avatar.ui;
// HTTP 요청을 처리하고 아바타 생성 서비스를 호출하는 컨트롤러 클래스
import com.mine.application.avatar.command.application.RegisterAvatarRequest;
import com.mine.application.avatar.command.application.RegisterAvatarService;
import com.mine.application.avatar.query.application.SearchAvatarService;
import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/avatar")
@RestController
public class AvatarController {

    private final RegisterAvatarService registerAvatarService;
    private final SearchAvatarService searchAvatarService;
    private final SessionDao sessionDao;

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
}
