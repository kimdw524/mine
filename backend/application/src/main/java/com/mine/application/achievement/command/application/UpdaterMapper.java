package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.updater.AchievementStateUpdater;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;

import java.util.HashMap;

final class UpdaterMapper {
    private static HashMap<Integer, AchievementStateUpdater> mappings;

    private UpdaterMapper() {
        throw new AssertionError();
    }

    static void addUpdater(Integer id, AchievementStateUpdater updater) {
        mappings.put(id, updater);
    }

    static AchievementStateUpdater getUpdaterOrElseThrow(int id) {
        AchievementStateUpdater updater = mappings.get(id);
        if (updater == null) {
            throw new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND);
        }
        return updater;
    }

    static int getAchievementSize() {
        return mappings.size();
    }
}
