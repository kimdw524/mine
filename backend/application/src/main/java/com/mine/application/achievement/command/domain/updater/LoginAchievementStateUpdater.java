package com.mine.application.achievement.command.domain.updater;

import com.mine.application.achievement.command.domain.AchievementState;
import com.mine.application.user.command.domain.log.LoginLog;
import com.mine.application.user.command.domain.log.LoginLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Component
public class LoginAchievementStateUpdater implements AchievementStateUpdater {

    private final LoginLogRepository loginLogRepository;

    @Override
    public int updateCount(AchievementState achievementState) {
        return updateLoginCount(achievementState);
    }

    private int updateLoginCount(AchievementState achievementState) {
        int userId = achievementState.getUserId();
        if (isUpdatedInToday(userId)) {
            return achievementState.getCount();
        }
        if (isLoggedInYesterday(userId)) {
            return achievementState.getCount() + 1;
        }
        return 1;
    }

    private boolean isUpdatedInToday(int userId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        LocalDateTime startOfDayToday = today.atStartOfDay();
        LocalDateTime endOfDayToday = today.atTime(LocalTime.MAX);

        List<LoginLog> loginLogs = loginLogRepository.findByUserIdAndLoginDateTimeBetween(
                userId,
                startOfDayToday,
                endOfDayToday
        );
        return loginLogs.size() > 1;
    }

    private boolean isLoggedInYesterday(int userId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDate yesterday = now.toLocalDate().minusDays(1);
        LocalDateTime startOfDayYesterday = yesterday.atStartOfDay();
        LocalDateTime endOfDayYesterday = yesterday.atTime(LocalTime.MAX);

        List<LoginLog> loginLogs = loginLogRepository.findByUserIdAndLoginDateTimeBetween(
                userId,
                startOfDayYesterday,
                endOfDayYesterday
        );
        return !loginLogs.isEmpty();
    }

}
