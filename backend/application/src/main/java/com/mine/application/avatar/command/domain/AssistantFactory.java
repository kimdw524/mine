package com.mine.application.avatar.command.domain;

import com.mine.application.avatar.command.domain.question.QuestionRes;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;


final class AssistantFactory {

    //TODO : FastAPI로 생성 로직 요청
    static Assistant createAssistant(List<QuestionRes> questionRes) {

        Assistant assistant = Assistant.builder().build();

        return assistant;
    }


    private HttpEntity<RequestBody> createEntity(List<QuestionRes> questionRes) {
        HttpHeaders headers = createHeader();
        RequestBody requestBody = new RequestBody();
    }


    private HttpHeaders createHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }


    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    private static class RequestBody {
        private String instruction;
    }
}
