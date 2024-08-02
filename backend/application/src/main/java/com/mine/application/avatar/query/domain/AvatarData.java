package com.mine.application.avatar.query.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
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
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "avatar_birthday")
    private LocalDateTime birthday;

    @Column(name = "avatar_model_id")
    private Integer modelId;

    @Column(name = "avatar_residence")
    private String residence;

    @Column(name = "avatar_job")
    private String job;


}
