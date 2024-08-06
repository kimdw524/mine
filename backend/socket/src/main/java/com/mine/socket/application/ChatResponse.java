package com.mine.socket.application;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class ChatResponse {
    private String sendedDate;
    private String text;
    private String role;
    private String avatarName;
    private Integer avatarId;
    // 추 후 객체 필요하다면 추가로 업데이트
    // 시간, 역할, 내용. 아바타 이름
}
