package com.mine.application.avatar.command.application;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class RegisterQuestionResRequest {
    private Integer questionId;
    private Integer questionChoiceId;
    private String subjectiveAns;
}
