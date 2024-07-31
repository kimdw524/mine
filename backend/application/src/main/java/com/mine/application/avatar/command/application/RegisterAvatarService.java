package com.mine.application.avatar.command.application;


import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.command.domain.AvatarRepository;
import com.mine.application.avatar.command.domain.question.QuestionRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RegisterAvatarService {
    private final AvatarRepository avatarRepository;
    private final QuestionResFactory questionResFactory;

    @Transactional
    public void avatarGenerate(RegisterAvatarRequest request) {
        List<QuestionRes> questionResList = request.getQuestionResList().stream()
                .map(questionResFactory::createEntity).toList();

        Avatar avatar = Avatar.builder()
                .name(request.getAvatarName())
                .job(request.getJob())
                .modelId(1) // 기본 1
                .residence(request.getResidence())
                .questionResList(questionResList)
                .build();

        avatar.generateAssistant();
        avatarRepository.save(avatar);
    }
}
