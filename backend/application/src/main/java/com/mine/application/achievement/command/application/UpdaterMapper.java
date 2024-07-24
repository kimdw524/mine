package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.updater.AchievementCountUpdater;

import java.util.HashMap;

final class UpdaterMapper {
    private static HashMap<Integer, AchievementCountUpdater> mappings;

    private UpdaterMapper() {
        throw new AssertionError();
    }

    static void addUpdater(Integer id, AchievementCountUpdater updater) {
        UpdaterMapper.mappings.put(id, updater);
    }

    static AchievementCountUpdater getUpdaterOrElseThrow(int id) {
        AchievementCountUpdater updater = mappings.get(id);
        if (updater == null) {
            throw new RuntimeException(); // TODO: getUpdaterOrElseThrow 예외처리
        }
        return updater;
    }

}
