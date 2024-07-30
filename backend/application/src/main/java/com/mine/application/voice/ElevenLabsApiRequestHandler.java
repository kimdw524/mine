package com.mine.application.voice;

import org.springframework.context.event.EventListener;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class ElevenLabsApiRequestHandler implements VirtualVoiceHandler {

    @Override
    public File getVoiceFile(String text, String voiceId) {
        return null;
    }

    @Override
    @EventListener
    @Async("VoiceUploadExecutor")
    public void uploadVoiceFile(FileUploadedEvent event) {

    }


    private HttpHeaders createMultipartFormDataHeader() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
        return httpHeaders;
    }


}
