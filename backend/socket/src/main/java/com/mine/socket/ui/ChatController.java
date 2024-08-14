package com.mine.socket.ui;

import com.mine.socket.application.ChatRequest;
import com.mine.socket.application.SendMessageService;
import com.mine.socket.exception.CustomException;
import com.mine.socket.infra.AssistantChatRequestedEventHandler;
import com.mine.socket.infra.ChatSendDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.SocketException;


@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
public class ChatController {

    private final SendMessageService sendMessageService;
    private final AssistantChatRequestedEventHandler handler;

    @MessageMapping("/{avatarId}")
    public void chatHandler(@DestinationVariable("avatarId") Integer avatarId, ChatRequest message) {
        log.info("front request chat : {}", message.toString());
        this.sendMessageService.sendMessage(message, avatarId, false);
    }

    @PostMapping("/test")
    public void chatSendTest(@RequestBody ChatSendDto chatSendDto) {
        handler.sendMessage(chatSendDto);
    }

    // OrderController.java class
    @MessageExceptionHandler // message 처리
    @SendToUser("/errors") // '/user/queue/errors' 를 구독하고 있으면 보낸 사람에게만 ErrorDto가 전달된다.
    public ErrorDto handleException(CustomException exception) {
        // throw new SocketException('message custom')을 던지면 이리로 들어온다.
        log.warn(exception.getMessage());
        ErrorDto errorMessage = ErrorDto.builder().status("fail").message(exception.getMessage()).build();
        return errorMessage;
    }
}
