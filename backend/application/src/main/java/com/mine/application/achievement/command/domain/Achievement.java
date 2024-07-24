package com.mine.application.achievement.command.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Entity
public class Achievement {

    @Id
    @Column(name = "achievement_id")
    private Integer id;

    @Column(name = "achievement_required_amount")
    private Integer amount;

    @Column(name = "achievement_title")
    private String title;

    @Column(name = "achievement_description")
    private String description;

}
