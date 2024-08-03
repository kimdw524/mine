package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.question.*;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor(access = AccessLevel.MODULE)
@Component
final class QuestionResFactory {
    private final QuestionRepository questionRepository;
    private final QuestionChoiceRepository questionChoiceRepository;

    QuestionRes createEntity(RegisterQuestionResRequest request) {
        Question question = questionRepository.findById(request.getQuestionId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        QuestionChoice questionChoice = null;

        if(question.getQuestionType().equals(QuestionType.CHOICE)) {
            questionChoice = questionChoiceRepository.findById(request.getQuestionChoiceId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        }
        return QuestionRes.builder()
                .question(question)
                .questionType(question.getQuestionType())
                .questionChoice(questionChoice)
                .subjectiveAns(request.getSubjectiveAns())
                .build();
    }
}
