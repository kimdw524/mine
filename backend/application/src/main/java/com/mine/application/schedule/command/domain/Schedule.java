package com.mine.application.schedule.command.domain;

import com.mine.application.schedule.ui.dto.UpdateScheduleRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Schedule {

    @Id
    @Column(name = "schedule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "schedule_category_id")
    private Integer categoryId;

    @Column(name = "schedule_start_datetime")
    private LocalDateTime startDateTime;

    @Column(name = "schedule+end_datetime")
    private LocalDateTime endDateTime;

    @Column(name = "schedule_title")
    private String title;

    @Column(name = "schedule_description")
    private String description;

    @Column(name = "schedule_where")
    private String where;

    @Builder
    public Schedule(Integer userId, Integer categoryId, LocalDateTime startDateTime, LocalDateTime endDateTime, String title, String description, String where) {
        this.userId = userId;
        this.categoryId = categoryId;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.title = title;
        this.description = description;
        this.where = where;
    }

    public void updateSchedule(UpdateScheduleRequest request) {
        this.categoryId = request.getCategoryId();
        this.startDateTime = request.getStartTime();
        this.endDateTime = request.getEndTime();
        this.title = request.getTitle();
        this.description = request.getDescription();
        this.where = request.getWhere();
    }

}
