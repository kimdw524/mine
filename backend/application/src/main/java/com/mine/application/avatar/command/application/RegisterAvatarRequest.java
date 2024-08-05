package com.mine.application.avatar.command.application;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class RegisterAvatarRequest {
    private String avatarName;
    private String residence;
    private String job;
    private List<RegisterQuestionResRequest> questionResList;
    private List<Base64FileUploadRequest> voiceFileList;
}
