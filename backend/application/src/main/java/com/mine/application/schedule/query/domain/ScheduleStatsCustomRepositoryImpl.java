package com.mine.application.schedule.query.domain;

import static com.mine.application.schedule.query.domain.QScheduleData.scheduleData;

import com.mine.application.schedule.ui.dto.GetScheduleStatsResponse;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ScheduleStatsCustomRepositoryImpl implements ScheduleStatsCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<GetScheduleStatsResponse> findScheduleStats(
            Integer userId,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime
    ) {
        return jpaQueryFactory
                .select(Projections.constructor(GetScheduleStatsResponse.class,
                        scheduleData.categoryId,
                        scheduleData.categoryId.count()))
                .from(scheduleData)
                .where(scheduleData.startDateTime.between(startDateTime, endDateTime)
                        .and(scheduleData.userId.eq(userId)))
                .groupBy(scheduleData.categoryId)
                .orderBy(new OrderSpecifier<>(Order.ASC, scheduleData.categoryId))
                .fetch();
    }

}
