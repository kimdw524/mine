package com.mine.application.avatar.command.application;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Base64FileUploadRequest {
    private String file;
    private String fileName;
    private String fileExtension;
    private String avatarId;
    private String chatType;
}
