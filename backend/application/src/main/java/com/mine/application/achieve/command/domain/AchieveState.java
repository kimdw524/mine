package com.mine.application.achieve.command.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
public class AchieveState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private String username;

    @Column(name = "sort_id", nullable = false)
    private Integer sortId;

    @Column(name = "achieve_rate", nullable = false)
    private String rate;

    @Column(name = "achieve_date")
    private LocalDateTime date;

    public void changeRate(final String rate) {
        this.rate = rate;
    }

    public void changeDate(final LocalDateTime date) {
        this.date = date;
    }

}
