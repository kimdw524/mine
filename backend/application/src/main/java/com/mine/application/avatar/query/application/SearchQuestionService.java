package com.mine.application.avatar.query.application;

import com.mine.application.avatar.query.domain.QuestionData;
import com.mine.application.avatar.query.domain.QuestionDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class SearchQuestionService {
    private final QuestionDataRepository questionDataRepository;

    public List<QuestionData> findAll() {
        return questionDataRepository.queryAll();
    }
}
