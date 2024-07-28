package com.mine.application.avatar.command.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
public class VoiceFile {

    @Id
    @Column(name = "voice_file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // EAGER -> 연관된 엔티티를 즉시 로드 -> 항상 필요하고, 성능 최적화가 필요하지 않을 때 사용함
    // LAZY -> 연관된 엔티티를 지연 로드 -> 항상 필요하진 않고, 성능 최적화가 중요할 때 사용함
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "avatar_id", nullable = false)
    private Integer avatarId;

    @Column(name = "voice_file_url")
    private String fileUrl;
}
