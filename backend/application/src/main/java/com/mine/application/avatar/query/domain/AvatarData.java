package com.mine.application.avatar.query.domain;

import com.mine.application.avatar.command.domain.voice.Voice;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;


@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Immutable
@Table(name = "avatar")
@Entity
public class AvatarData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "avatar_id")
    @Getter
    private Integer avatarId;

    @Column(name = "user_id")
    private Integer userId;

    @Getter
    @Column(name = "avatar_name")
    private String avatarName;

    @Column(name = "avatar_birthday")
    @Getter
    private LocalDateTime birthday;

    @Column(name = "avatar_personality")
    @Getter
    private String personality;

    @Column(name = "avatar_model")
    @Getter
    private String avatarModel;

    @Column(name = "avatar_residence")
    @Getter
    private String residence;

    @Embedded
    private Voice voiceId;

    @Column(name = "avatar_job")
    @Getter
    private String job;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Getter
    @Column(name = "is_main")
    private Boolean isMain;

    public String getVoiceId() {
        return voiceId.getVoiceId();
    }
}
