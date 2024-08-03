package com.mine.application.avatar.query.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "question")
@Entity
@Getter
public class QuestionData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer id;

    @Column(name = "question_num")
    private Integer num;

    @Column(name = "question_description")
    private String description;

    @Column(name = "question_type")
    private Character type;

    @OneToMany(mappedBy = "questionData", fetch = FetchType.LAZY)
    private List<QuestionChoiceData> questionChoiceList = new ArrayList<>();

}
