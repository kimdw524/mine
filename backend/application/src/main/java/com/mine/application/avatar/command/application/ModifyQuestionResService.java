package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.command.domain.question.QuestionChoice;
import com.mine.application.avatar.command.domain.question.QuestionChoiceRepository;
import com.mine.application.avatar.command.domain.question.QuestionRes;
import com.mine.application.avatar.command.domain.question.QuestionType;
import com.mine.application.avatar.infra.AssistantModifyRequestBody;
import com.mine.application.avatar.infra.AssistantService;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class ModifyQuestionResService {
    private final AvatarRepository avatarRepository;
    private final QuestionChoiceRepository questionChoiceRepository;
    private final AssistantService assistantService;

    @Transactional
    public void updateQuestionRes(Integer avatarId, Integer userId, List<ModifyQuestionResRequest> requests) {
        Avatar avatar = avatarRepository.findAvatarInAllDataByIdAndUserId(avatarId, userId ).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        boolean isModify = false;
        List<ModifyQuestionResDto> dtos = new ArrayList<>();
        for(ModifyQuestionResRequest request : requests) {
            for(QuestionRes questionRes : avatar.getQuestionResList()) {
                if(questionRes.getId().equals(request.getQuestionResId())) {
                    QuestionChoice findChoice = null;
                    if(questionRes.getQuestionType().equals(QuestionType.CHOICE))
                        findChoice =  questionChoiceRepository.findById(request.getQuestionChoiceId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
                    ModifyQuestionResDto modifyInfo = questionRes.updateRes(request, findChoice);
                    isModify |= questionRes.isModify();
                    if(questionRes.isModify()) {
                        dtos.add(modifyInfo);
                    }
                    break;
                }
            }
        }

        if(isModify) {
            AssistantModifyRequestBody assistantModifyRequestBody = new AssistantModifyRequestBody();
                    assistantModifyRequestBody.setAssistant_id(avatar.getAssistant().getAssistantId());
                    assistantModifyRequestBody.setThread_id(avatar.getAssistant().getThreadId());
                    assistantModifyRequestBody.setInstruction(getInstruction(dtos, avatar.getName()));
            assistantService.modifyAssistantInfo(assistantModifyRequestBody);
        }
    }

    public String getInstruction(List<ModifyQuestionResDto> dtos, String avatarName) {
        StringBuilder sb = new StringBuilder();
        for (ModifyQuestionResDto dto : dtos) {
            sb.append(avatarName).append("의 ");
            sb.append(dto.getQuestion()).append(" ");
            sb.append(dto.getAnswer());
            sb.append(" 로 바꿉니다. \n");
        }

        return sb.toString();
    }

}
