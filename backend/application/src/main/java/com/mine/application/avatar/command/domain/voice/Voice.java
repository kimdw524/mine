package com.mine.application.avatar.command.domain.voice;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Voice {
    @Column(name = "avatar_voice_id")
    private String voiceId;

    // TODO : 음성 파일 -> elevenlabs -> return된 voice 저장 로직.
}
