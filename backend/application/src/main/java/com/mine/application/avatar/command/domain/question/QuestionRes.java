package com.mine.application.avatar.command.domain.question;

import com.mine.application.avatar.command.domain.Avatar;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table
@Entity
public class QuestionRes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_res_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @OneToOne
    @JoinColumn(name = "question_choice_id")
    private QuestionChoice questionChoice;

    @Column(name = "subjective_ans")
    private String subjectiveAns;

    @Convert(converter = QuestionTypeConverter.class)
    @Column(name = "question_type")
    private QuestionType questionType;


    public String getInstruction() {
        StringBuilder sb = new StringBuilder();
        sb.append(question.getDescription()).append("라는 질문에는");
        if (questionType.equals(QuestionType.CHOICE)) {
            sb.append(questionChoice.getDescription());
        } else {
            sb.append(subjectiveAns);
        }
        sb.append("라고 답했어.");
        sb.append('\n');
        return sb.toString();
    }
}
