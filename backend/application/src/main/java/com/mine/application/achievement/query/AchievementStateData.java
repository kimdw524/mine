package com.mine.application.achievement.query;

import com.mine.application.achievement.command.domain.Achievement;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;

@Entity
@Table(name="achievement_state")

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Immutable
public class AchievementStateData {

    @Id
    @Column(name = "achievement_state_id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "achievement_id")
    private Achievement achievement;

    @Column(name = "achievement_count")
    private Integer count;

    @Column(name = "achieved_date")
    private LocalDateTime achieved_date;

}
