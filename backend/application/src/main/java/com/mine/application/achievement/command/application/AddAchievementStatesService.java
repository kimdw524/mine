package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.AchievementRepository;
import com.mine.application.achievement.command.domain.AchievementState;
import com.mine.application.achievement.command.domain.AchievementStateRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class AddAchievementStatesService {

    private final AchievementRepository achievementRepository;
    private final AchievementStateRepository achievementStateRepository;

    @Transactional
    public void addAchievementStates(int userId) {
        IntStream.rangeClosed(1, UpdaterMapper.getAchievementCount())
                .mapToObj(i -> AchievementState.builder()
                        .userId(userId)
                        .achievement(achievementRepository.findById(i))
                        .count(0)
                        .build())
                .forEach(achievementStateRepository::save);
    }

}
