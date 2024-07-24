package com.mine.application.achievement.query;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface AchievementStateDataRepository extends Repository<AchievementStateData, Integer> {

    List<AchievementStateData> findAllByUserId(Integer userId);

}
