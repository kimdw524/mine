package com.mine.application.schedule.command.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

@Getter
@Immutable
@Entity
public class ScheduleCategory {

    @Id
    @Column(name = "schedule_category_id")
    private Integer id;

    @Column(name = "schedule_category_name")
    private String name;

}
