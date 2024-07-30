package com.mine.application.avatar.query;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;

@Entity
@Table(name="avatar")

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Immutable
public class AvatarData {

    @Id
    @Column(name = "avatar_id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "avatar_name")
    private String name;

    @Column(name = "avatar_birthday")
    private LocalDateTime birthday;

    @Column(name = "avatar_personality")
    private String personality;

    @Column(name = "avatar_assistant_id")
    private String assistantId;

    @Column(name = "avatar_thread_id")
    private String threadId;

    @Column(name = "avatar_voice_id")
    private String voiceId;

    @Column(name = "avatar_model_id")
    private Integer modelId;

    @Column(name = "avatar_residence")
    private String residence;

    @Column(name = "avatar_job")
    private String job;

}
