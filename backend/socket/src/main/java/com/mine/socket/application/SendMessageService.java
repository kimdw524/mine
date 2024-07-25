package com.mine.socket.application;


import com.mine.socket.domain.AvatarData;
import com.mine.socket.domain.AvatarRepository;
import com.mine.socket.domain.Chat;
import com.mine.socket.domain.ChatRepository;
import com.mine.socket.infra.AssistantChatRequestedEventHandler;
import com.mine.socket.infra.ChatSendDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service
public class SendMessageService {
    private final AssistantChatRequestedEventHandler requestedEventHandler;
    private final AvatarRepository avatarRepository;
    private final ChatRepository chatRepository;

    @Transactional
    public void sendMessage(ChatRequest request, Integer avatarId, boolean isVoiced) {
        AvatarData avatarData = avatarRepository.getAvatarInfo(avatarId);
        ChatSendDto dto = ChatSendDto.builder()
                .avatarData(avatarData)
                .request(request)
                .build();

        Chat chat = Chat.builder()
                .sendedAt(request.getSendedAt())
                .chatCategoryId(0)
                .chatContent(request.getChatContent())
                .chatId(chatRepository.)
                .chatRole("u")
                .chatType(isVoiced ? "v" : "t")
                .userId(avatarData.getUserId())
                .created_at(LocalDateTime.now())
                .build();

        chatRepository.save(chat);
        requestedEventHandler.sendMessage(dto);
    }
}
