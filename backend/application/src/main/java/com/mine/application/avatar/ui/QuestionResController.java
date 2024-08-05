package com.mine.application.avatar.ui;

import com.mine.application.avatar.command.application.ModifyQuestionResRequest;
import com.mine.application.avatar.command.application.ModifyQuestionResService;
import com.mine.application.avatar.command.domain.question.Question;
import com.mine.application.avatar.query.application.SearchQuestionResService;
import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return ResponseEntity.ok(searchQuestionResService.getQueastionResDataV2(avatarId));
    }

    @PatchMapping("")
    @LoginCheck
    public ResponseEntity<?> updateQuestions(@PathVariable Integer avatarId, @RequestBody List<ModifyQuestionResRequest> requestList) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        modifyQuestionResService.updateQuestionRes(avatarId, userId, requestList);
        return ResponseEntity.accepted().build();
    }
}
