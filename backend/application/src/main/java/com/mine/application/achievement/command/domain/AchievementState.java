package com.mine.application.achievement.command.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Entity
public class AchievementState {

    @Id
    @Column(name = "achievement_state_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "achievement_id", nullable = false)
    private Achievement achievement;

    @Column(name = "achievement_count", nullable = false)
    private Integer count;

    @Column(name = "achieved_date")
    private LocalDateTime achieved_date;

    @Column(name = "is_achieved")
    private Boolean isAchieved;

    @Builder
    public AchievementState(Integer userId, Achievement achievement, Integer count) {
        this.userId = userId;
        this.achievement = achievement;
        this.count = count;
        this.isAchieved = false;
    }

    public void changeCount(final int count) {
        this.count = count;
        if(achievementCompleted()) {
            this.isAchieved = true;
            achieved_date = LocalDateTime.now();
        }
    }

    public boolean isAchieved() {
        return isAchieved;
    }

    /*
     * 개발용
     * */
    public void tempChangeCountApi(final int count) {
        this.count = count;
    }

    private boolean achievementCompleted() {
        return achievement.getAmount().equals(count);
    }

}
