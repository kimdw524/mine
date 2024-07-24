package com.mine.application.achievement.command.domain;

import org.springframework.data.repository.Repository;

public interface AchievementRepository extends Repository<Achievement, Integer> {

    Achievement findById(int id);

}
