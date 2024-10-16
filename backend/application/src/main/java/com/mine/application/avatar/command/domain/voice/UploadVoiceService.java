package com.mine.application.avatar.command.domain.voice;

import com.mine.application.avatar.command.application.Base64FileUploadRequest;
import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UploadVoiceService {

    private final AvatarRepository avatarRepository;
    private final VirtualVoiceHandler virtualVoiceHandler;
    private final SpeechToText speechToText;

    public String updateVoice(Base64FileUploadRequest request) {
        String chatType = request.getChatType();
        validateTypeOrElseThrow(chatType);

        if (isUpdateRequired(chatType)) {
            Optional<Avatar> byId = avatarRepository.findById(request.getAvatarId());
            if(byId.isEmpty()) {
                throw new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND);
            }

            byId.get().getVoice().putVoice(request);
        }

        return speechToText.getTextFromSpeech(request);
    }

    public Voice generateVoice(List<Base64FileUploadRequest> requests) {
        List<VoiceUploadedEvent> events = requests.stream().map(request -> {
            File voiceFile = Base64AndFileConverter.base64ToFile(request);
            return VoiceUploadedEvent.builder().file(voiceFile).build();
        }).toList();
        return virtualVoiceHandler.generateVoice(events);
    }

    private boolean isUpdateRequired(String type) {
        return "c".equals(type);
    }

    private void validateTypeOrElseThrow(String type) {
        if ("c".equals(type)) return;
        if ("a".equals(type)) return;
        if ("s".equals(type)) return;
        throw new RestApiException(CommonErrorCode.INVALID_PARAMETER);
    }
}
