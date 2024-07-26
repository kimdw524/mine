package com.mine.socket.infra;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AssistantChatRequestedEventHandler {
    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.fast-api-key}")
    private String routingFastApiKey;

    @Value("${rabbitmq.routing.fast-api-batch-key}")
    private String routingFastApiBatchKey;

    public void sendMessage(ChatSendDto chatSendDto) {
        sendMessage(routingFastApiKey, chatSendDto);
    }

    public void sendBatchMessage(ChatBatchDto dto) {
        sendMessage(routingFastApiBatchKey, dto);
    }

    private void sendMessage(String routingKey, Object object) {
        this.rabbitTemplate.convertAndSend(exchangeName, routingKey, object);
    }
}
