package com.mine.application.account.command.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

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

    @Convert(converter = AccountType.class)
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

    @Column(name = "create_at")
    private LocalDateTime createAt;

}
