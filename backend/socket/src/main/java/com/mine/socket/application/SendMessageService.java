package com.mine.socket.application;


import com.mine.socket.domain.AvatarData;
import com.mine.socket.domain.AvatarRepository;
import com.mine.socket.domain.Chat;
import com.mine.socket.domain.ChatRepository;
import com.mine.socket.exception.CustomException;
import com.mine.socket.infra.AssistantChatRequestedEventHandler;
import com.mine.socket.infra.ChatSendDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.SocketException;
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
        if(avatarData == null) {
            log.error("avatar is not exist, {}", avatarId);
            throw new CustomException("아바타 아이디가 존재하지 않습니다.");

        }
        ChatSendDto dto = ChatSendDto.builder()
                .avatarData(avatarData)
                .request(request)
                .build();

        Chat chat = Chat.builder()
                .sendedAt(request.getSendedAt())
                .avatarId(avatarId)
                .chatCategoryId(0)
                .chatContent(request.getChatContent())
                .chatId(ChatRepository.nextId())
                .chatRole("u")
                .chatType(isVoiced ? "v" : "t")
                .userId(avatarData.getUserId())
                .created_at(LocalDateTime.now())
                .build();

        log.info("send chat to fast api : {}", dto.toString());

        chatRepository.save(chat);
        requestedEventHandler.sendMessage(dto);
    }
}
