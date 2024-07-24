package com.mine.application.achievement.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AchievementRepository extends Repository<Achievement, Integer> {

    Optional<Achievement> findById(int id);

}
