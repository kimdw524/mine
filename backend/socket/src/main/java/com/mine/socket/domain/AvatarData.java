package com.mine.socket.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AvatarData {
    private String assistantId;
    private String threadId;
    private Integer avatarId;
    private String avatarName;
    private Integer userId;
}
