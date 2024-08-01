package com.mine.application.avatar.command.domain.voice;

import com.mine.application.avatar.command.application.Base64FileUploadRequest;
import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.common.event.Events;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UploadVoiceService {

    private final AvatarRepository avatarRepository;
    private final VirtualVoiceHandler virtualVoiceHandler;

    public void updateVoice(Base64FileUploadRequest request) {

        Optional<Avatar> byId = avatarRepository.findById(request.getAvatarId());
        if(byId.isEmpty()) {
            throw new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND);
        }

        byId.get().getVoice().putVoice(request);
    }

    public Voice generateVoice(List<Base64FileUploadRequest> requests) {
        List<VoiceUploadedEvent> events = requests.stream().map(request -> {
            File voiceFile = Base64AndFileConverter.base64ToFile(request);
            return VoiceUploadedEvent.builder().file(voiceFile).build();
        }).toList();
        return virtualVoiceHandler.generateVoice(events);
    }

}
