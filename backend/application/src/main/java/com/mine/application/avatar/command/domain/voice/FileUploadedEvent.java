package com.mine.application.avatar.command.domain.voice;

import lombok.*;

import java.io.File;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileUploadedEvent {
    private File file;
    private String voiceId;
    private Integer avatarId;
}
