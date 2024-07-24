package com.mine.application.achievement.command.application;

import com.mine.application.achievement.command.domain.AchievementRepository;
import com.mine.application.achievement.command.domain.AchievementState;
import com.mine.application.achievement.command.domain.AchievementStateRepository;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AddAchievementStatesService {

    private final SessionDao sessionDao;
    private final AchievementRepository achievementRepository;
    private final AchievementStateRepository achievementStateRepository;

    @Transactional
    public void addAchievementStates() {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        int size = UpdaterMapper.getAchievementSize();
        for (int i = 1; i <= size; i++) {
            achievementStateRepository.save(AchievementState.builder()
                    .userId(userId)
                    .achievement(achievementRepository.findById(i))
                    .count(0)
                    .build()
            );
        }
    }

}
