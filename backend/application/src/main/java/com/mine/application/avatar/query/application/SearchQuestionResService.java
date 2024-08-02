package com.mine.application.avatar.query.application;

import com.mine.application.avatar.query.domain.QuestionResData;
import com.mine.application.avatar.query.domain.QuestionResDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchQuestionResService {
    private final QuestionResDataRepository questionResDataRepository;

    public List<QuestionResData> questionResData(Integer avatarId) {
        return questionResDataRepository.findAllBy(avatarId);
    }
}
