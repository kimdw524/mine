package com.mine.application.avatar.command.application;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.infra.AssistantModifyRequestBody;
import com.mine.application.avatar.infra.AssistantService;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ModifyAvatarService {
    private final AvatarRepository avatarRepository;
    private final SessionDao sessionDao;
    private final AssistantService assistantService;

    @Transactional
    public void modifyAvatar(Integer avatarId, ModifyAvatarRequest request) {
        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        Avatar avatar = avatarRepository.findById(avatarId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if(!avatar.getUserId().equals(userId)) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        }

        AssistantModifyRequestBody body = avatar.modifyAvatarInfo(request);

        if(request.getIsMain() != null && avatar.getIsMain() != request.getIsMain()) {
            Optional<Avatar> avatarByUserIdAndNotAvatarId = avatarRepository.findAvatarByUserIdAndNotAvatarId(userId, avatar.getId());
            avatarByUserIdAndNotAvatarId.ifPresent(another -> another.modifyAvatarInfo(ModifyAvatarRequest.builder().isMain(false).build()));
        }
        if(avatar.isModify()){
            body.setAssistant_id(avatar.getAssistant().getAssistantId());
            body.setThread_id(avatar.getAssistant().getThreadId());
            assistantService.modifyAssistantInfo(body);
        }
    }
}
