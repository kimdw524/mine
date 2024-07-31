package com.mine.application.avatar.command.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
public class AvatarModel {

    @Id
    @Column(name = "avatar_model_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer modelId;

    @Column(name = "avatar_model_url", nullable = false)
    private String modelUrl;
}
