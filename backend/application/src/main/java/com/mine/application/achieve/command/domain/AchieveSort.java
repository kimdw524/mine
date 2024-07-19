package com.mine.application.achieve.command.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
public class AchieveSort {

    @Id
    private Integer id;

    @Column(name = "required_amount")
    private String amount;

    @Size(max = 20)
    private String title;

    @Size(max = 50)
    private String description;

}
