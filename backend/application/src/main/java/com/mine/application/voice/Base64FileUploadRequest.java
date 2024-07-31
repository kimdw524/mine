package com.mine.application.voice;

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
}
