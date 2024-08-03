package com.mine.application.avatar.command.domain.voice;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Base64FileUploadedEvent {
    private String file;
    private String fileName;
    private String fileExtension;
    private String avatarId;
}
