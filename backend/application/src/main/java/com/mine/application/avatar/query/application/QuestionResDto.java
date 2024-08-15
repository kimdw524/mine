package com.mine.application.avatar.query.application;

import com.mine.application.avatar.query.domain.QuestionChoiceData;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class QuestionResDto {
    private Integer questionResId;
    private Character questionType;
    private Integer questionId;
    private String question;
    private List<QuestionChoiceData> questionChoices;
    private QuestionChoiceData choiceAnswer;
    private String subjectiveAnswer;
}
