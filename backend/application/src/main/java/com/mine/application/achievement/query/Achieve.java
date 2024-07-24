package com.mine.application.achievement.query;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;

@Entity
@Table(name="achieve_state")

@AllArgsConstructor
@NoArgsConstructor
@Immutable
public class Achieve {

    @Id
    private Integer id;

    @Getter
    @Column(name = "sort_id")
    private Integer sortId;

    @Getter
    @Column(name = "achieve_rate")
    private String rate;

    @Getter
    @Column(name = "achieve_date")
    private LocalDateTime date;

}
