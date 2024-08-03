package com.mine.application.avatar.query.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "question_res")
@Entity
public class QuestionResData {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_res_id")
    private Integer id;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private QuestionData questionData;

    @Column(name = "avatar_id")
    private Integer avatarId;

    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_choice_id")
    private QuestionChoiceData choice;

    @Getter
    @Column(name = "subjective_ans")
    private String subjectiveAns;

    @Getter
    @Column(name = "question_type")
    private Character type;
}
