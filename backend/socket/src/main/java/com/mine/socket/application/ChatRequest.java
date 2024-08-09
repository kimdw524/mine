package com.mine.socket.application;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@ToString
public class ChatRequest {
    private String chatContent;
    private LocalDateTime sendedAt;
}
