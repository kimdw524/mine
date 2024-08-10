package com.mine.application.avatar.query.application;

import com.mine.application.avatar.query.domain.QuestionChoiceData;
import com.mine.application.avatar.query.domain.QuestionData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
public class QuestionDto {
    private Integer questionId;

    private Integer num;

    private String description;

    private Character type;

    private List<QuestionChoiceData> questionChoiceList;

    public QuestionDto(QuestionData questionData, String questionPrefix, String questionPostfix) {
        this.questionId = questionData.getQuestionId();
        this.num = questionData.getNum();
        this.description = questionPrefix + questionData.getDescription() + questionPostfix;
        this.type = questionData.getType();
        this.questionChoiceList = questionData.getQuestionChoiceList();
    }

}
