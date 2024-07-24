package com.mine.application.achievement.query;

import com.mine.application.achievement.ui.dto.GetAchievementStateResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AchievementStateQueryService {

    private final SessionDao sessionDao;
    private final AchievementStateDataRepository achievementStateDataRepository;

    public List<GetAchievementStateResponse> getAchievementStates() {
        Integer userId = getUserIdOrElseThrow();

        List<AchievementStateData> achievementStateList =
                achievementStateDataRepository.findAllByUserId(userId);

        Collections.sort(achievementStateList,
                (o1, o2) -> Integer.compare(o1.getAchievement().getId(), o2.getAchievement().getId()));

        List<GetAchievementStateResponse> result = new ArrayList<>();
        for (int i = 0; i < achievementStateList.size(); i++) {
            AchievementStateData curr = achievementStateList.get(i);

            result.add(GetAchievementStateResponse.builder()
                    .achievementId(curr.getAchievement().getId())
                    .title(curr.getAchievement().getTitle())
                    .description(curr.getAchievement().getDescription())
                    .amount(curr.getAchievement().getAmount())
                    .count(curr.getCount())
                    .date(curr.getDate())
                    .build()
            );
        }
        return result;
    }

    private Integer getUserIdOrElseThrow() {
        return (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
    }

}
