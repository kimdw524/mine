package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.command.domain.question.QuestionChoice;
import com.mine.application.avatar.command.domain.question.QuestionChoiceRepository;
import com.mine.application.avatar.command.domain.question.QuestionRes;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@RequiredArgsConstructor
@Service
public class ModifyQuestionResService {
    private final AvatarRepository avatarRepository;
    private final QuestionChoiceRepository questionChoiceRepository;

    @Transactional
    public void updateQuestionRes(Integer avatarId, Integer userId, List<ModifyQuestionResRequest> requests) {
        Avatar avatar = avatarRepository.findAvatarInAllDataByIdAndUserId(avatarId, userId ).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        for(ModifyQuestionResRequest request : requests) {
            for(QuestionRes questionRes : avatar.getQuestionResList()) {
                if(questionRes.getId().equals(request.getQuestionResId())) {
                    QuestionChoice findChoice =  questionChoiceRepository.findById(request.getQuestionChoiceId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
                    questionRes.updateRes(request, findChoice);
                    break;
                }
            }
        }
    }



}
