package com.mine.application.avatar.ui;

import com.mine.application.avatar.query.application.SearchQuestionResService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/avatar/{avatarId}/question")
public class QuestionResController {
    private final SearchQuestionResService searchQuestionResService;

    @GetMapping("")
    public ResponseEntity<?> findAllByAvatarId(@PathVariable Integer avatarId) {
        return ResponseEntity.ok(searchQuestionResService.questionResData(avatarId));
    }
}
