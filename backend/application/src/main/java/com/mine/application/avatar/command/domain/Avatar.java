package com.mine.application.avatar.command.domain;

import com.mine.application.avatar.command.application.ModifyAvatarRequest;
import com.mine.application.avatar.command.domain.question.QuestionRes;
import com.mine.application.avatar.command.domain.voice.Voice;
import com.mine.application.common.domain.BaseEntity;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "avatar")
@Entity
@AttributeOverride(name = "createdAt", column = @Column(name = "avatar_birthday"))
public class Avatar extends BaseEntity {
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

    @Enumerated(EnumType.STRING)
    @Column(name = "avatar_model")
    private AvatarModel model;

    @Column(name = "avatar_residence")
    private String residence;

    @Column(name = "avatar_job")
    private String job;

    @OneToMany(mappedBy = "avatar", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<QuestionRes> questionResList = new ArrayList<>();

    @Column(name = "is_main")
    private Boolean isMain;

    public void enrollAssistant(Assistant assistant) {
        if (this.assistant == null) {
            this.assistant = assistant;
            return;
        }
        throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
    }

    public void setQuestionResList(List<QuestionRes> questionResList) {
        for (QuestionRes questionRes : questionResList) {
            questionRes.setAvatar(this);
            this.questionResList.add(questionRes);
        }
    }

    public void delete() {
        super.delete();
    }

    public void modifyAvatarInfo(ModifyAvatarRequest request) {
        if(request.getAvatarName() != null && !request.getAvatarName().equals(name)) {
            this.name = request.getAvatarName();
            isModify = true;
        }

        if(request.getJob() != null && !request.getJob().equals(job)) {
            this.job = request.getJob();
            isModify = true;
        }

        if(request.getResidence() != null && !request.getResidence().equals(residence)) {
            this.residence = request.getResidence();
            isModify = true;
        }

        if(request.getModel() != null && !request.getModel().equalsIgnoreCase(model.name())) {
            boolean flag = false;
            for(AvatarModel avatarModel : AvatarModel.values()) {
                if(request.getModel().equalsIgnoreCase(avatarModel.name())) {
                    this.model = avatarModel;
                    isModify = true;
                    flag = true;
                    break;
                }
            }

            if(!flag) {
                throw new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND);
            }
        }
        if(request.getIsMain() != null) {
            this.isMain = request.getIsMain();
        }
    }

    @Transient
    private boolean isModify;


}
