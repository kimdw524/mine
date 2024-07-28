package com.mine.application.avatar.command.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

// NoArgsConstructor -> 파라미터가 없는 기본 생성자를 자동으로 생성 함
@NoArgsConstructor
@Getter
@Entity
public class Avatar {

    // GeneratedValue -> 기본 키의 값을 DB가 자동으로 생성하게 설정 함
    @Id
    @Column(name = "avatar_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // nullable = false -> 값이 비어 있을 수 없도록 함
    @ManyToOne(fetch = FetchType.EAGER)
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "avatar_name", nullable = false)
    private String name;

    @Column(name = "avatar_birthday", nullable = false)
    private LocalDateTime birthday;

    @Column(name = "avatar_personality")
    private String personality;

    @Column(name = "avatar_assistant_id", nullable = false)
    private String assistantId;

    @Column(name = "avatar_thread_id", nullable = false)
    private String threadId;

    @Column(name = "avatar_voice_id", nullable = false)
    private String voiceId;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.EAGER)
    @Column(name = "avatar_model_id", nullable = false)
    private Integer modelId;

    @Column(name = "avatar_residence")
    private String residence;

    @Column(name = "avatar_job")
    private String job;

    @Builder
    public Avatar(Integer userId, String name, LocalDateTime birthday, String personality, String assistantId, String threadId, String voiceId, Integer modelId, String residence, String job) {
        this.userId = userId;
        this.name = name;
        this.birthday = birthday;
        this.personality = personality;
        this.assistantId = assistantId;
        this.threadId = threadId;
        this.voiceId = voiceId;
        this.modelId = modelId;
        this.residence = residence;
        this.job = job;
    }

}
