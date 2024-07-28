package com.mine.application.schedule.query;

import com.mine.application.user.command.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ScheduleData {

    @Id
    @Column(name = "schedule_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;

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

}
