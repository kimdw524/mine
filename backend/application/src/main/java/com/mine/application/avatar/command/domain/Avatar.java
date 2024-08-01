package com.mine.application.avatar.command.domain;

import com.mine.application.avatar.command.application.Base64FileUploadRequest;
import com.mine.application.avatar.command.domain.question.QuestionRes;
import com.mine.application.avatar.command.domain.voice.Base64FileUploadedEvent;
import com.mine.application.avatar.command.domain.voice.VirtualVoiceHandler;
import com.mine.application.avatar.command.domain.voice.Voice;
import com.mine.application.avatar.command.domain.voice.VoiceUploadedEvent;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.common.event.Events;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Getter
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

    public String getInstruction() {
        StringBuilder sb = new StringBuilder();
        questionResList.forEach(questionRes -> sb.append(questionRes.getInstruction()));
        return sb.toString();
    }

    public void enrollAssistant(Assistant assistant) {
        if(this.assistant == null) {
            this.assistant = assistant;
        }
        throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
    }
}
