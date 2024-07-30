package com.mine.application.account.command.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.Immutable;

@Immutable
@Entity
public class SpendType {

    @Id
    @Column(name = "spend_category_id")
    private Integer id;

    @Column(name = "spend_category_name")
    private String name;

}
