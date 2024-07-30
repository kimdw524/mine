package com.mine.application.avatar.ui.dto;
// 아바타 데이터를 클라이언트에 전송하기 위한 DTO, builder 패턴을 사용해 생성
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetAvatarResponse {

    private Integer avatarId;

    private Integer userId;

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