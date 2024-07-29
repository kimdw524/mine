package com.mine.application.account.query.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "account")
@Immutable
@Entity
public class AccountData {

    @Id
    @Column(name = "account_id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "spend_category_id")
    private Integer spendCategoryId;

    @Column(name = "account_type")
    private String accountType;

    @Column(name = "account_money")
    private Long money;

    @Column(name = "account_title")
    private String title;

    @Column(name = "account_description")
    private String description;

    @Column(name = "account_datetime")
    private LocalDateTime dateTime;

}
