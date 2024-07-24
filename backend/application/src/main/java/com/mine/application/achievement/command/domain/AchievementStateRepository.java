package com.mine.application.achievement.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AchievementStateRepository extends Repository<AchievementState, Integer> {

    Optional<AchievementState> findBySortIdAndUsername(String email, Integer id);

}
