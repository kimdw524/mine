package com.mine.application.avatar.query.domain;

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

    @Column(name = "avatar_birthday")
    @Getter
    private LocalDateTime birthday;

    @Column(name = "avatar_model_id")
    @Getter
    private Integer modelId;

    @Column(name = "avatar_residence")
    @Getter
    private String residence;

    @Column(name = "avatar_job")
    @Getter
    private String job;


}
