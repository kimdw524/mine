package com.mine.application.account.infrastructure;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class OpenAiChat {

    private final OpenAiChatModel openAiChatModel;

    @GetMapping("/ai")
    public ResponseEntity<?> getFormatOfAddAccount(@RequestParam String query) {
        PromptTemplate promptTemplate = new PromptTemplate(
                """
                '{query}'를
                accountType, money, title, description, dateTime을 가진
                json으로 답변해줘 json 외에 다른 답변은 주지마.
                'accountType'은 지출이면 S, 수입이면 I.
                'money'은 다음 예시와 같이 300만원 -> 3000000.
                'dateTime'에 관한 정보가 없다면 지금 시간으로 주고 
                '어제'와 같은 정보가 있다면 분석해서 줘
                그리고 초는 0초로 줘.
                지금시간은 {now}.
                """);
        Prompt prompt = promptTemplate.create(Map.of("query", query, "now", LocalDateTime.now().toString()));
        String response = openAiChatModel.call(prompt).getResult().getOutput().getContent();

        response = response.substring(7, response.length() - 3);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        try {
            TestDto test = objectMapper.readValue(response, TestDto.class);
            return ResponseEntity.ok().body(test);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(response);
    }

}
