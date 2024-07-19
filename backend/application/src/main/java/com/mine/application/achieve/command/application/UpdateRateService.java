package com.mine.application.achieve.command.application;

import com.mine.application.achieve.command.domain.Updater.RateUpdater;
import com.mine.application.achieve.command.domain.AchieveState;
import com.mine.application.achieve.command.domain.AchieveStateRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class UpdateRateService {

    private final UpdaterMapper updaterMapper;
    private final AchieveStateRepository achieveStateRepository;

    @Transactional
    public boolean updateRate(String email, int sortId) {
        AchieveState achieveState = achieveStateRepository.findBySortIdAndUsername(email, sortId)
                .orElseThrow(); // TODO: updateRate 예외처리

        RateUpdater rateUpdater = updaterMapper.getUpdater(sortId)
                .orElseThrow();

        String updatedRate = rateUpdater.updateRate(achieveState);

        achieveState.changeRate(updatedRate);

//        if (updatedRate.equals(MAX_ACHIEVE_RATE)) {
//            achieveState.changeDate(LocalDateTime.now());
//            return true;
//        }
        return false;
    }

    private boolean hasAchieved(String rate) {

    }

}
