package com.mine.application.avatar.ui;

import com.mine.application.avatar.query.application.SearchQuestionService;
import com.mine.application.common.aop.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/question")
public class QuestionController {
    private final SearchQuestionService searchQuestionService;

    @GetMapping("")
    @LoginCheck
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(searchQuestionService.findAll());
    }
}
