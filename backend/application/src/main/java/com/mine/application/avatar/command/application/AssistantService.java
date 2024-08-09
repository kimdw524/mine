package com.mine.application.avatar.command.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mine.application.avatar.command.domain.Assistant;
import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.query.application.SearchQuestionResService;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Service
public class AssistantService {
    private static final String FAST_API_REQUEST_ASSISTANT_URL = "http://ai:8000/api/avatar";
    private final AvatarRepository avatarRepository;
    private final SearchQuestionResService searchQuestionResService;
    private final ObjectMapper objectMapper;

    @Getter
    @AllArgsConstructor
    private static class AssistantRegisterRequestBody {
        private String job;
        private String instruction;
        private String name;
        private String residence;
    }

    @Transactional(readOnly = true)
    public Assistant generateAssistant(Avatar avatar) {

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Assistant> assistantResponseEntity = restTemplate.postForEntity(FAST_API_REQUEST_ASSISTANT_URL, createRegisterRequestBody(avatar), Assistant.class);

        if (assistantResponseEntity.getStatusCode().isError()) {
            log.error("fast api server has Error. {} ", assistantResponseEntity.getBody());
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }

        return assistantResponseEntity.getBody();
    }

    private HttpHeaders createHttpHeader() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }


    private HttpEntity<String> createRegisterRequestBody(Avatar avatar) {
        String instruction = searchQuestionResService.getInstruction(avatar.getId());
        AssistantRegisterRequestBody requestBody = new AssistantRegisterRequestBody(avatar.getJob(), instruction, avatar.getName(), avatar.getResidence());

        HttpHeaders httpHeaders = createHttpHeader();

        try {
            return new HttpEntity<>(objectMapper.writeValueAsString(requestBody), httpHeaders);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
//        MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();
//        String json =
//        System.out.println(instruction);
//        requestData.add("instruction", instruction);
//        requestData.add("name", avatar.getName());
//        requestData.add("job", avatar.getJob());
//        requestData.add("residence", avatar.getResidence());

    }
    @Getter
    @AllArgsConstructor
    @Builder
    private static class AssistantModifyRequestBody {
        private String job;
        private String instruction;
        private String name;
        private String residence;
        private String assistant_id;
    }

    @Transactional(readOnly = true)
    public void modifyAssistantInfo(Avatar avatar) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.patchForObject(FAST_API_REQUEST_ASSISTANT_URL, createModifyRequestBody(avatar), Assistant.class);
    }

    private HttpEntity<String> createModifyRequestBody(Avatar avatar) {
        String instruction = searchQuestionResService.getInstruction(avatar.getId());
        AssistantModifyRequestBody requestBody = AssistantModifyRequestBody.builder()
                .assistant_id(avatar.getAssistant().getAssistantId())
                .job(avatar.getJob())
                .name(avatar.getName())
                .residence(avatar.getResidence())
                .instruction(instruction)
                .build();

        HttpHeaders httpHeaders = createHttpHeader();

        try {
            return new HttpEntity<>(objectMapper.writeValueAsString(requestBody), httpHeaders);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
//        MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();
//        String json =
//        System.out.println(instruction);
//        requestData.add("instruction", instruction);
//        requestData.add("name", avatar.getName());
//        requestData.add("job", avatar.getJob());
//        requestData.add("residence", avatar.getResidence());

    }
}
