package com.mine.application.achievement.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AchievementStateRepository extends Repository<AchievementState, Integer> {

    Optional<AchievementState> findByUserIdAndAchievement_Id(Integer userId, Integer id);

    AchievementState save(AchievementState achievementState);

    Long countAchievementStateByUserIdAndIsAchieved(Integer userId, Boolean isAchieved);

}
