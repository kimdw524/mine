package com.mine.application.avatar.command.domain.voice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RequiredArgsConstructor
@Component
public class ElevenLabsApiRequestHandler implements VirtualVoiceHandler {

    private static final String ELEVEN_LABS_EDIT_URL = "";
    private static final String ELEVEN_LABS_UPLOAD_URL = "https://api.elevenlabs.io/v1/voices/add";
    private static final String API_KEY = "sk_6bc08ac561e6c47d29452cb32d54a3afa4c76dc68d171c0d";

    @Override
    @EventListener
    @Async("VoiceUploadExecutor")
    public void uploadVoiceFile(FileUploadedEvent event) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(createMultipartBody(event.getFile().toPath()), createMultipartFormDataHeader());


        RestTemplate restTemplate = new RestTemplate();
        //TODO : avatar에 voice 아이디가 없다면  add, else edit
        ResponseEntity<String> response = restTemplate.postForEntity(ELEVEN_LABS_UPLOAD_URL, requestEntity, String.class);

        if(response.getStatusCode().is4xxClientError()) {
            log.error("eleven labs errorMsg : {}", response.getBody());
            log.error("eleven labs errorHeader : {}", response.getHeaders());
        }else {
            log.info("eleven labs add Voice : {}", response.getBody());
            //TODO : IF avatar에 Voice ID 가 없다면 저장하는 로직

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

}
