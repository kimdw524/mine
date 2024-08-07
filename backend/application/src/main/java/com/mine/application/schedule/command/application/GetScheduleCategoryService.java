package com.mine.application.schedule.command.application;

import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.schedule.command.domain.ScheduleCategory;
import com.mine.application.schedule.command.domain.ScheduleCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GetScheduleCategoryService {

    private final ScheduleCategoryRepository scheduleCategoryRepository;

    public String getScheduleCategory(int id) {
        return scheduleCategoryRepository.findById(id)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND))
                .getName();
    }

}
