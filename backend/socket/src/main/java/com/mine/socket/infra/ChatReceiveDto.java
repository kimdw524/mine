package com.mine.socket.infra;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatReceiveDto {
    private String chatContent;
    private String sendedAt;
    private Integer avatarId;
    private Integer userId;
}
