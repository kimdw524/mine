package com.mine.application.avatar.command.domain.question;

import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer id;

    @Column(name = "question_num")
    private Integer questionNum;

    @Column(name = "question_description")
    private String description;

    @Column(name = "question_type")
    @Convert(converter = QuestionTypeConverter.class)
    private QuestionType questionType;
}
