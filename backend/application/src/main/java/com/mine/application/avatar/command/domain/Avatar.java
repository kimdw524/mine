package com.mine.application.avatar.command.domain;

import com.mine.application.avatar.command.domain.question.QuestionRes;
import com.mine.application.avatar.command.domain.voice.Voice;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "avatar")
@Entity
@AttributeOverride(name = "created_at", column = @Column(name = "birthday"))
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "avatar_id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "avatar_name")
    private String name;

    @Column(name = "avatar_personality")
    private String personality;

    @Embedded
    private Voice voice;

    @Embedded
    private Assistant assistant;

    @Column(name = "avatar_model_id")
    private Integer modelId;

    @Column(name = "avatar_residence")
    private String residence;

    @Column(name = "avatar_job")
    private String job;

    @OneToMany(mappedBy = "avatar", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<QuestionRes> questionResList = new ArrayList<>();

    public void putQuestion(QuestionRes questionRes) {
        questionResList.add(questionRes);
    }

    public void generateAssistant() {
        if(assistant == null) {
            this.assistant = AssistantFactory.createAssistant(questionResList);
        }
    }
}
