package com.mine.application.avatar.query.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@AllArgsConstructor
@Getter
public class QuestionResDto {
    private Character questionType;
    private Integer questionId;
    private String question;
    private List<QuestionChoiceData> questionChoices;
    private QuestionChoiceData choiceAnswer;
    private String subjectiveAnswer;
}
