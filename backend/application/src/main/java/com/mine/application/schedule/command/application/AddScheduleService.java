package com.mine.application.schedule.command.application;

import com.mine.application.common.domain.SessionDao;
import com.mine.application.schedule.command.domain.Schedule;
import com.mine.application.schedule.command.domain.ScheduleRepository;
import com.mine.application.schedule.converter.ScheduleDtoConverter;
import com.mine.application.schedule.infrastructure.ai.AddScheduleDto;
import com.mine.application.schedule.infrastructure.ai.ScheduleAiChat;
import com.mine.application.schedule.ui.dto.AddScheduleByCalendarRequest;
import com.mine.application.schedule.ui.dto.AddScheduleFromChatResponse;
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
//        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
//                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        scheduleRepository.save(ScheduleDtoConverter.convert(request, 1));
    }

    @Transactional
    public AddScheduleFromChatResponse addScheduleByChat(String query) {
//        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
//                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        AddScheduleDto addScheduleDto = scheduleAiChat.getAddScheduleDtoFromQuery(query);

        Schedule schedule = ScheduleDtoConverter.convert(addScheduleDto, 1);
        scheduleRepository.save(schedule);

        return ScheduleDtoConverter.convert(schedule);
    }

}
