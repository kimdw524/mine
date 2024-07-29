package com.mine.application.account.query.domain;

import static com.mine.application.account.query.domain.QAccountData.accountData;
import static com.mine.application.schedule.query.domain.QScheduleData.scheduleData;

import com.mine.application.account.ui.dto.GetAccountResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class AccountDataCustomRepositoryImpl implements AccountDataCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<GetAccountResponse> findAccountsBetweenDates(
            Integer userId,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime)
    {
        return jpaQueryFactory
                .select(Projections.constructor(GetAccountResponse.class,
                        accountData.id,
                        accountData.spendCategoryId,
                        accountData.accountType,
                        accountData.money,
                        accountData.title,
                        accountData.description,
                        accountData.dateTime))
                .from(accountData)
                .where(accountData.dateTime.between(startDateTime, endDateTime)
                        .and(scheduleData.userId.eq(userId)))
                .fetch();
    }

    @Override
    public List<GetAccountResponse> findAccountsByContaining(Integer userId, String query) {
        return jpaQueryFactory
                .select(Projections.constructor(GetAccountResponse.class,
                        accountData.id,
                        accountData.spendCategoryId,
                        accountData.accountType,
                        accountData.money,
                        accountData.title,
                        accountData.description,
                        accountData.dateTime))
                .from(accountData)
                .where(accountData.title.contains(query)
                        .or(accountData.description.contains(query))
                        .and(accountData.userId.eq(userId)))
                .fetch();
    }

}
