package com.mine.application.schedule.query.domain;

import static com.mine.application.schedule.query.domain.QScheduleData.scheduleData;

import com.mine.application.schedule.ui.dto.GetSchedulesResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ScheduleDataCustomRepositoryImpl implements ScheduleDataCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<GetSchedulesResponse> findSchedulesBetweenDates(
            Integer userId,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime)
    {
        return jpaQueryFactory
                .select(Projections.constructor(GetSchedulesResponse.class,
                        scheduleData.id,
                        scheduleData.categoryId,
                        scheduleData.startDateTime,
                        scheduleData.endDateTime,
                        scheduleData.title,
                        scheduleData.description,
                        scheduleData.where))
                .from(scheduleData)
                .where(scheduleData.startDateTime.between(startDateTime, endDateTime)
                        .and(scheduleData.userId.eq(userId)))
                .fetch();
    }

}
