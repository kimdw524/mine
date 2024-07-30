package com.mine.application.schedule.query.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "schedule")
@Immutable
@Entity
public class ScheduleData {

    @Id
    @Column(name = "schedule_id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "schedule_category_id")
    private Integer categoryId;

    @Column(name = "schedule_start_datetime")
    private LocalDateTime startDateTime;

    @Column(name = "schedule_end_datetime")
    private LocalDateTime endDateTime;

    @Column(name = "schedule_title")
    private String title;

    @Column(name = "schedule_description")
    private String description;

    @Column(name = "schedule_where")
    private String where;

}
