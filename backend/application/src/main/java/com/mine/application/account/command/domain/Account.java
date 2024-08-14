package com.mine.application.account.command.domain;

import com.mine.application.account.ui.dto.UpdateAccountRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Account {

    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "spend_category_id")
    private Integer spendCategoryId;

    @Convert(converter = AccountTypeConverter.class)
    @Column(name = "account_type")
    private AccountType accountType;

    @Column(name = "account_money")
    private Long money;

    @Column(name = "account_title")
    private String title;

    @Column(name = "account_description")
    private String description;

    @Column(name = "account_datetime")
    private LocalDateTime dateTime;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Account(Integer userId, Integer spendCategoryId, AccountType accountType, Long money, String title, String description, LocalDateTime dateTime, LocalDateTime createdAt) {
        this.userId = userId;
        this.spendCategoryId = spendCategoryId;
        this.accountType = accountType;
        this.money = money;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.createdAt = createdAt;
    }

    public void updateAccount(UpdateAccountRequest request) {
        this.spendCategoryId = request.getSpendCategoryId();
        this.accountType = AccountType.of(request.getAccountType());
        this.money = request.getMoney();
        this.title = request.getTitle();
        this.description = request.getDescription();
        this.dateTime = request.getDateTime();
    }

}
