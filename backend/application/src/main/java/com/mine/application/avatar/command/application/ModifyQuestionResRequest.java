package com.mine.application.avatar.command.application;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ModifyQuestionResRequest {
    private Integer questionResId;
    private Integer questionChoiceId;
    private String subjectiveAns;
}
