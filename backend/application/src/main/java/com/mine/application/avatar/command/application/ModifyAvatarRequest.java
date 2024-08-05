package com.mine.application.avatar.command.application;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ModifyAvatarRequest {
    private String avatarName;
    private String job;
    private String residence;
    private Integer modelId;

}
