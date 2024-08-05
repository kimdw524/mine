package com.mine.application.avatar.command.domain.voice;

import lombok.*;

import java.io.File;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoiceUploadedEvent {
    private File file;
    private Voice voice;
}
