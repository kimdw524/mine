package com.mine.application.achievement.query;

import com.mine.application.achievement.ui.dto.AchievementConverter;
import com.mine.application.achievement.ui.dto.GetAchievementStateResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AchievementStateQueryService {

    private final SessionDao sessionDao;
    private final AchievementStateDataRepository achievementStateDataRepository;

    @Transactional
    public List<GetAchievementStateResponse> getAchievementStates() {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        return achievementStateDataRepository.findAllByUserId(userId)
                .stream()
                .sorted(Comparator.comparingInt(o -> o.getAchievement().getId()))
                .map(AchievementConverter::convert)
                .collect(Collectors.toList());
    }

}
