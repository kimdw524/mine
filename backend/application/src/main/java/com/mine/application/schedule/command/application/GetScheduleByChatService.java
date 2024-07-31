package com.mine.application.schedule.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.schedule.command.domain.Schedule;
import com.mine.application.schedule.command.domain.ScheduleRepository;
import com.mine.application.schedule.infrastructure.ai.ScheduleAiChat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class GetScheduleByChatService {

    private final SessionDao sessionDao;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleAiChat scheduleAiChat;

    public String getScheduleByChat(String query) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        List<Schedule> schedules = scheduleRepository.findAllByUserId(userId);

        return scheduleAiChat.getJsonFromQuery(query, schedules);
    }

}
