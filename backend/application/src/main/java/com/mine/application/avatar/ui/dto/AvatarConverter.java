package com.mine.application.avatar.ui.dto;
// AvatarData -> GetAvatarResponse 변환, 매핑
import com.mine.application.avatar.query.AvatarData;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AvatarConverter {

    public static GetAvatarResponse convert(AvatarData avatarData) {
        return GetAvatarResponse.builder()
                .userId(avatarData.getUserId())
                .name(avatarData.getName())
                .birthday(avatarData.getBirthday())
                .personality(avatarData.getPersonality())
                .assistantId(avatarData.getAssistantId())
                .threadId(avatarData.getThreadId())
                .voiceId(avatarData.getVoiceId())
                .modelId(avatarData.getModelId())
                .residence(avatarData.getResidence())
                .job(avatarData.getJob())
                .build();
    }

}