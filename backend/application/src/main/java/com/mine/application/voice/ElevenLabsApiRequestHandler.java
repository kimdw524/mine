package com.mine.application.voice;

import com.mine.application.avatar.command.domain.AvatarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.io.File;
import java.nio.file.Path;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class ElevenLabsApiRequestHandler implements VirtualVoiceHandler {

    private static final String ELEVEN_LABS_EDIT_URL = "";
    private static final String ELEVEN_LABS_UPLOAD_URL = "";
    private static final String API_KEY = "";

    @Override
    @EventListener
    @Async("VoiceUploadExecutor")
    public void uploadVoiceFile(FileUploadedEvent event) {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(createMultipartBody(event.getFile().toPath()), createMultipartFormDataHeader());

        //TODO : avatar ID 찾아오는 로직
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity("ELEVEN_LABS_URL", requestEntity, String.class);

        if(response.getStatusCode().is4xxClientError()) {
            log.error("eleven labs errorMsg : {}", response.getBody());
            log.error("eleven labs errorHeader : {}", response.getHeaders());
        }else {
            log.info("eleven labs add Voice");
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
        body.add("files", List.of(new PathResource(path)));
        return body;
    }

}
