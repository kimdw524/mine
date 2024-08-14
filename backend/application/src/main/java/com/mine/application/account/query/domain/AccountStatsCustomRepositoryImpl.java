package com.mine.application.account.query.domain;

import static com.mine.application.account.query.domain.QAccountData.accountData;

import com.mine.application.account.ui.dto.GetSpendAccountStatsResponse;
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
public class AccountStatsCustomRepositoryImpl implements AccountStatsCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<GetSpendAccountStatsResponse> findSpendAccountStats(
            Integer userId,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime
    ) {
        return jpaQueryFactory
                .select(Projections.constructor(GetSpendAccountStatsResponse.class,
                        accountData.spendCategoryId,
                        accountData.money.sum()))
                .from(accountData)
                .where(accountData.dateTime.between(startDateTime, endDateTime)
                        .and(accountData.userId.eq(userId))
                        .and(accountData.spendCategoryId.isNotNull()))
                .groupBy(accountData.spendCategoryId)
                .orderBy(new OrderSpecifier<>(Order.ASC, accountData.spendCategoryId))
                .fetch();
    }

    @Override
    public Long findIncomeAccountStats(
            Integer userId,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime
    ) {
        return jpaQueryFactory
                .select(accountData.money.sum())
                .from(accountData)
                .where(accountData.dateTime.between(startDateTime, endDateTime)
                        .and(accountData.userId.eq(userId))
                        .and(accountData.spendCategoryId.isNull()))
                .fetchOne();
    }

}
