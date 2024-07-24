package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.updater.LoginAchievementCountUpdater;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UpdateMapperConfig {

    @Autowired
    private LoginAchievementCountUpdater loginAchievementCountUpdater;

    public InitializingBean addUpdateAchievementService() {
        return () -> UpdaterMapper.addUpdater(1, loginAchievementCountUpdater);
    }

}
