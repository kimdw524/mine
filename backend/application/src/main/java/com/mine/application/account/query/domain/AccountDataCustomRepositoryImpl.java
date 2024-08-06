package com.mine.application.account.query.domain;

import static com.mine.application.account.query.domain.QAccountData.accountData;

import com.mine.application.account.ui.dto.GetAccountResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
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
    public List<GetAccountResponse> findAccountsByDatesAndCategory(
            Integer userId,
            String appendType,
            Integer categoryId,
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
                        .and(accountData.userId.eq(userId))
                        .and(categoryIdEq(appendType, categoryId)))
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

    private BooleanExpression categoryIdEq(String accountType, Integer categoryId) {
        if (accountType == null) {
            return null;
        }
        if ("I".equals(accountType)) {
            return accountData.accountType.eq("I");
        }
        return categoryId == null ?
                accountData.accountType.eq("S") :
                accountData.spendCategoryId.eq(categoryId);
    }

}
