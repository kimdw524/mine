package com.mine.application.achieve.command.application;

import com.mine.application.achieve.command.domain.Updater.RateUpdater;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class UpdaterMapper {
    private static HashMap<Integer, RateUpdater> mapper;

    static {
        // TODO: Factory init logic
    }

    public Optional<RateUpdater> getUpdater(int id) {
        return Optional.ofNullable(mapper.get(id));
    }

}
