package com.mine.application.avatar.query.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Immutable
@Table(name = "question_choice")
@Entity
public class QuestionChoiceData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_choice_id")
    @Getter
    private Integer questionChoiceId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuestionData questionData;

    @Column(name = "question_choice_number")
    @Getter
    private Integer number;

    @Column(name = "question_choice_description")
    @Getter
    private String description;
}
