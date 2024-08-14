package com.mine.application.schedule.command.domain;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends Repository<Schedule, Integer> {

    Optional<Schedule> findById(int id);

    List<Schedule> findAllByUserId(Integer userId);

    void save(Schedule schedule);

    void delete(Schedule schedule);

}
