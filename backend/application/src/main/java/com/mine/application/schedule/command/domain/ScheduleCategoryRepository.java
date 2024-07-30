package com.mine.application.schedule.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ScheduleCategoryRepository extends Repository<ScheduleCategory, Integer> {

    Optional<ScheduleCategory> findById(int id);

}
