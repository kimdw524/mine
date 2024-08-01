package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.updater.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class UpdateMapperConfig {

    private final LoginAchievementStateUpdater loginAchievementCountUpdater;
    private final AvatarAchievementStateUpdater questionAchievementUpdater;
    private final AccountAchievementStateUpdater accountAchievementStateUpdater;
    private final ScheduleAchievementStateUpdater scheduleAchievementUpdater;
    private final EasterEggAchievementStateUpdater easterEggAchievementUpdater;

    @Bean
    public InitializingBean addUpdateAchievementService() {
        return () -> {
            UpdaterMapper.addUpdater(1, loginAchievementCountUpdater);
            UpdaterMapper.addUpdater(2, questionAchievementUpdater);
            UpdaterMapper.addUpdater(3, accountAchievementStateUpdater);
            UpdaterMapper.addUpdater(4, scheduleAchievementUpdater);
            UpdaterMapper.addUpdater(5, easterEggAchievementUpdater);
        };
    }

}
