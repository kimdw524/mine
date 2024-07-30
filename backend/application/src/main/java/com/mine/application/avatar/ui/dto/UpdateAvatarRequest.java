package com.mine.application.avatar.ui.dto;
// 아바타 수정 요청을 담는 DTO
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class UpdateAvatarRequest {

    private Integer avatarId;
    private String name;
    private LocalDateTime birthday;
    private String personality;
    private String voiceId;
    private Integer modelId;
    private String residence;
    private String job;
}