package com.mine.application.schedule.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.schedule.command.domain.Schedule;
import com.mine.application.schedule.command.domain.ScheduleRepository;
import com.mine.application.schedule.converter.ScheduleDtoConverter;
import com.mine.application.schedule.infrastructure.ai.AddScheduleDto;
import com.mine.application.schedule.infrastructure.ai.ScheduleAiChat;
import com.mine.application.schedule.ui.dto.AddScheduleByCalendarRequest;
import com.mine.application.schedule.ui.dto.AddScheduleByChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AddScheduleService {

    private final SessionDao sessionDao;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleAiChat scheduleAiChat;

    @Transactional
    public void addScheduleByCalendar(AddScheduleByCalendarRequest request) {
        int userId = getUserIdOrElseThrow();
        scheduleRepository.save(ScheduleDtoConverter.convert(request, userId));
    }

    @Transactional
    public AddScheduleByChatResponse addScheduleByChat(String query) {
        AddScheduleDto addScheduleDto = scheduleAiChat.getAddScheduleDtoFromQuery(query);

        int userId = getUserIdOrElseThrow();
        Schedule schedule = ScheduleDtoConverter.convert(addScheduleDto, userId);
        scheduleRepository.save(schedule);

        return ScheduleDtoConverter.convert(schedule);
    }

    private int getUserIdOrElseThrow() {
        return (Integer) sessionDao.get(SessionConstants.USER_ID)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.UNAUTHORIZED));
    }

}
