package com.mine.application.achieve.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AchieveStateRepository extends Repository<AchieveState, Integer> {

    Optional<AchieveState> findBySortIdAndUsername(String email, Integer id);


}
