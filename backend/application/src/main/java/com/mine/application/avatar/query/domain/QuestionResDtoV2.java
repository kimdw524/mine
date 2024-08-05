package com.mine.application.avatar.query.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionResDtoV2 {
    private Integer questionResId;
    private Integer questionId;
    private Character questionType;
    private String answer;
}
