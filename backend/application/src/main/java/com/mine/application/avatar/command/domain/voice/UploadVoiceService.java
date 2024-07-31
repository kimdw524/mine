package com.mine.application.avatar.command.domain.voice;

import com.mine.application.avatar.command.application.Base64FileUploadRequest;
import com.mine.application.common.event.Events;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Base64;

@RequiredArgsConstructor
@Service
public class UploadVoiceService {

    public void uploadFile(Base64FileUploadRequest request) {
        //TODO : 세션으로 아바타 ID 가져올 건지, dto로 avatarId 가져올건지? 일단 DTO로 받아오는 거로 하자.
        File voiceFile = base64ToFile(request);
        Events.raise(new FileUploadedEvent(voiceFile, request.getAvatarId(), 0));
    }

    private File base64ToFile(Base64FileUploadRequest request) {
        byte[] binary = Base64.getDecoder().decode(request.getFile());

        File file = Base64AndFileConverter.base64ToFile(request);

        return file;
    }



}
