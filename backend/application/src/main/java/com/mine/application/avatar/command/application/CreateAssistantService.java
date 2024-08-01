package com.mine.application.avatar.command.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mine.application.avatar.command.domain.Assistant;
import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Service
class CreateAssistantService {
    private final static String FAST_API_REQUEST_ASSISTANT_CREATE_URL = "http://localhost:8000/avatar";

    Assistant generateAssistant(Avatar avatar) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Assistant> assistantResponseEntity = restTemplate.postForEntity(FAST_API_REQUEST_ASSISTANT_CREATE_URL, createRequestBody(avatar), Assistant.class);

        if(assistantResponseEntity.getStatusCode().isError()) {
            log.info("fast api server has Error.");
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }

        return assistantResponseEntity.getBody();
    }

    private HttpHeaders createHttpHeader() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }

    private MultiValueMap<String, String> createRequestBody(Avatar avatar) {
        String instruction = avatar.getInstruction();

        MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();
        requestData.add("instruction", instruction);
        requestData.add("name", avatar.getName());
        requestData.add("job", avatar.getJob());
        requestData.add("residence", avatar.getResidence());

        return requestData;
    }

}
