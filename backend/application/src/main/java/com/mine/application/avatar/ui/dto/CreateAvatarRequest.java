package com.mine.application.avatar.ui.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class CreateAvatarRequest {

    private String name;
    private LocalDateTime birthday;
    private String personality;
    private String assistantId;
    private String threadId;
    private String voiceId;
    private Integer modelId;
    private String residence;
    private String job;

}
