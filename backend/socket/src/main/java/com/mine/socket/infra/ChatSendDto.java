package com.mine.socket.infra;


import com.mine.socket.application.ChatRequest;
import com.mine.socket.domain.AvatarData;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor

@Setter
@Getter
@ToString
public class ChatSendDto {
    private String chatContent;
    private String assistantId;
    private String threadId;
    private Integer avatarId;
    private Integer userId;
    private String timestamp;

    @Builder
    public ChatSendDto(AvatarData avatarData, ChatRequest request) {
        this.chatContent = request.getChatContent();
        this.assistantId = avatarData.getAssistantId();
        this.avatarId = avatarData.getAvatarId();
        this.threadId = avatarData.getThreadId();
        this.userId = avatarData.getUserId();
        this.timestamp = LocalDateTime.now().toString();
    }

    public ChatSendDto() {
        this.timestamp = LocalDateTime.now().toString();
    }
}
