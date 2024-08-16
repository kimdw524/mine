package com.mine.application.avatar.infra;

import com.mine.application.avatar.command.domain.voice.VirtualVoiceHandler;
import com.mine.application.avatar.command.domain.voice.Voice;
import com.mine.application.avatar.command.domain.voice.VoiceUploadedEvent;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.PathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.file.Path;
import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Component
class ElevenLabsApiRequestHandler implements VirtualVoiceHandler {

    private static final String ELEVEN_LABS_EDIT_URL_FORMAT = "https://api.elevenlabs.io/v1/voices/%s/edit";
    private static final String ELEVEN_LABS_UPLOAD_URL = "https://api.elevenlabs.io/v1/voices/add";

    @Value("${elevenlabs.api-key}")
    private String API_KEY;


    @Override
    @EventListener
    @Async("VoiceUploadExecutor")
    public void updateVoice(VoiceUploadedEvent event) {
        String requestUrl = String.format(ELEVEN_LABS_EDIT_URL_FORMAT, event.getVoice().getVoiceId());
        uploadFile(event, requestUrl);
    }

    @Override
    public Voice generateVoice(List<VoiceUploadedEvent> events) {
        ResponseEntity<VoiceResponse> voiceResponseEntity = uploadFiles(events);

        return Objects.requireNonNull(voiceResponseEntity.getBody()).toVoice();
    }

    private ResponseEntity<VoiceResponse> uploadFiles(List<VoiceUploadedEvent> events) {
        MultiValueMap<String,  Object> map = new LinkedMultiValueMap<>();
        map.add("name", "mine");
        events.forEach(event -> putFileToMultipartBody(event.getFile().toPath(), map));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, createMultipartFormDataHeader());

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<VoiceResponse> response;

        response = restTemplate.postForEntity(ElevenLabsApiRequestHandler.ELEVEN_LABS_UPLOAD_URL, requestEntity, VoiceResponse.class);

        if(response.getStatusCode().isError()) {
            log.error("eleven labs errorMsg : {}", response.getBody());
            log.error("eleven labs errorHeader : {}", response.getHeaders());
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }else {
            log.info("eleven labs add Voice : {}", response.getBody());
            //파일 삭제.
            events.stream().forEach(event -> event.getFile().delete());
        }

        return response;
    }

    private void uploadFile(VoiceUploadedEvent event, String url) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(createMultipartBody(event.getFile().toPath()), createMultipartFormDataHeader());


        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response;

        response = restTemplate.postForEntity(url, requestEntity, String.class);

        if(response.getStatusCode().isError()) {
            log.error("eleven labs errorMsg : {}", response.getBody());
            log.error("eleven labs errorHeader : {}", response.getHeaders());
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }else {
            log.info("eleven labs add Voice : {}", response.getBody());
            //파일 삭제.
            event.getFile().delete();
        }

    }

    private HttpHeaders createMultipartFormDataHeader() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
        httpHeaders.set("xi-api-key", API_KEY);
        return httpHeaders;
    }

    private MultiValueMap<String, Object> createMultipartBody(Path path) {
        MultiValueMap<String, Object> body
                = new LinkedMultiValueMap<>();
        body.add("name", "mine");
        body.add("files", new PathResource(path));
        return body;
    }

    private void putFileToMultipartBody(Path path, MultiValueMap<String, Object> target) {
        target.add("files", new PathResource(path));
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class VoiceResponse {
        private String voice_id;

        private Voice toVoice() {
            return new Voice(voice_id);
        }
    }

}
