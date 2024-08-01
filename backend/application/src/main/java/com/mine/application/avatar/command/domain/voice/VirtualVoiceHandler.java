package com.mine.application.avatar.command.domain.voice;

import java.util.List;

public interface VirtualVoiceHandler {
    void updateVoice(VoiceUploadedEvent event);

    Voice generateVoice(List<VoiceUploadedEvent> events);
}
