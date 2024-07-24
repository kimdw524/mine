package com.mine.application.achievement.command.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Achievement {

    @Id
    @Column(name = "achievement_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "achievement_required_amount")
    private Integer amount;

    @Column(name = "achievement_title")
    private String title;

    @Column(name = "achievement_description")
    private String description;

}
