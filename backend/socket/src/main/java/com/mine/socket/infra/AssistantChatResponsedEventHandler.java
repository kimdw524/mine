package com.mine.socket.infra;


import com.mine.socket.application.ChatResponse;
import com.mine.socket.domain.AvatarData;
import com.mine.socket.domain.AvatarRepository;
import com.mine.socket.domain.Chat;
import com.mine.socket.domain.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
@RequiredArgsConstructor
public class AssistantChatResponsedEventHandler {

    private final ChatRepository chatRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final AvatarRepository avatarRepository;

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Transactional
    @RabbitListener(queues = "${rabbitmq.queue.my-name}")
    public void receiveChatMessageFromFastAPI(ChatReceiveDto chatReceiveDto) {
        Chat chat = Chat.builder()
                .chatId(ChatRepository.nextId())
                .chatContent(chatReceiveDto.getChatContent())
                .chatCategoryId(0)
                .chatType("t")
                .avatarId(chatReceiveDto.getAvatarId())
                .userId(chatReceiveDto.getUserId())
                .chatRole("b")
                .created_at(LocalDateTime.now())
                .sendedAt(LocalDateTime.parse(chatReceiveDto.getSendedAt(), dateTimeFormatter))
                .build();

        chatRepository.save(chat);

        AvatarData avatarData = avatarRepository.getAvatarInfo(chatReceiveDto.getAvatarId());

        ChatResponse response = ChatResponse.builder()
                .text(chat.getChatContent())
                .avatarId(chatReceiveDto.getAvatarId())
                .avatarName(avatarData.getAvatarName())
                .role("b")
                .sendedDate(chat.getSendedAt())
                .build();

        log.info(response.toString());
        messagingTemplate.convertAndSend("/chat/" + chatReceiveDto.getAvatarId(), response);
    }
}
