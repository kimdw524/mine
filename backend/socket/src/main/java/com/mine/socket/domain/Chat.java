package com.mine.socket.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Chat {

    private UUID chatId;
    private Integer userId;
    private Integer avatarId;
    private Integer chatCategoryId;
    private LocalDateTime created_at;
    private String chatContent;
    private String chatRole;
    private String chatType;
    private LocalDateTime sendedAt;


    public byte[] uuidToBytes() {
        byte[] uuidBytes = new byte[16];
        ByteBuffer.wrap(uuidBytes)
                .order(ByteOrder.BIG_ENDIAN)
                .putLong(chatId.getMostSignificantBits())
                .putLong(chatId.getLeastSignificantBits());
        return uuidBytes;
    }

}
