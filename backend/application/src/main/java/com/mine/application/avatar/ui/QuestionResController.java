package com.mine.application.avatar.ui;

import com.mine.application.avatar.command.ModifyQuestionResRequestListWrapper;
import com.mine.application.avatar.command.application.ModifyQuestionResService;
import com.mine.application.avatar.query.application.SearchQuestionResService;
import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
@RestController
@RequestMapping("/avatars/{avatarId}/questions")
public class QuestionResController {
    private final SearchQuestionResService searchQuestionResService;
    private final ModifyQuestionResService modifyQuestionResService;
    private final SessionDao sessionDao;

    @GetMapping("")
    @LoginCheck
    public ResponseEntity<?> findAllByAvatarId(@PathVariable Integer avatarId) {
        return ResponseEntity.ok(searchQuestionResService.getQuestionResDataV2(avatarId));
    }

    @PatchMapping("")
    @LoginCheck
    public ResponseEntity<?> updateQuestions(@PathVariable Integer avatarId, @RequestBody ModifyQuestionResRequestListWrapper requestList) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        modifyQuestionResService.updateQuestionRes(avatarId, userId, requestList.getList());
        return ResponseEntity.accepted().build();
    }
}
