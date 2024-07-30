package com.mine.application.voice;

import java.io.File;

public interface VirtualVoiceHandler {
    File getVoiceFile(String text, String voiceId);

    void uploadVoiceFile(FileUploadedEvent event);
}
