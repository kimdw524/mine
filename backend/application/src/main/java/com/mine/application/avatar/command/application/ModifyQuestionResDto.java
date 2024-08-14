package com.mine.application.avatar.command.application;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class ModifyQuestionResDto {
    private String question;
    private String answer;
}
