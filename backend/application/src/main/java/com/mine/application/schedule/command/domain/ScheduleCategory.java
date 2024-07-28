package com.mine.application.schedule.command.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "schedule_category")
@Entity
public class ScheduleCategory {

    @Id
    @Column(name = "schedule_category_id")
    private Integer id;

    @Column(name = "schdule_category_name")
    private String name;

}
