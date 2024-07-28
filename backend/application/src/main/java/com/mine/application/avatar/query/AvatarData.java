package com.mine.application.avatar.query;

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

    // GeneratedValue -> 기본 키의 값을 DB가 자동으로 생성하게 설정 함
    @Id
    @Column(name = "avatar_id")
    private Integer id;

    // nullable = false -> 값이 비어 있을 수 없도록 함
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "avatar_model_id")
    private Integer modelId;

    @Column(name = "avatar_residence")
    private String residence;

    @Column(name = "avatar_job")
    private String job;

}
