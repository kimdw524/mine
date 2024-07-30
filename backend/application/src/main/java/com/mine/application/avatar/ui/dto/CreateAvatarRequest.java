package com.mine.application.avatar.ui.dto;
// 클라이언트로부터 전달받은 아바타 생성 요청을 담는 DTO 클래스
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

// NoArgsConstructor -> 파라미터가 없는 기본 생성자를 생성
@NoArgsConstructor
@Getter
@Setter
public class CreateAvatarRequest {

    private String name;
    private String personality;
    private String assistantId;
    private String threadId;
    private String voiceId;
    private Integer modelId;
    private String residence;
    private String job;

}
