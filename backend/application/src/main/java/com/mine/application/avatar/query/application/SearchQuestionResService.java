package com.mine.application.avatar.query.application;

import com.mine.application.avatar.command.domain.Avatar;
import com.mine.application.avatar.query.domain.*;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchQuestionResService {
    private final QuestionResDataRepository questionResDataRepository;
    private final SearchQuestionService searchQuestionService;
    private final AvatarDataRepository avatarDataRepository;
    private final SessionDao sessionDao;

    @Transactional(readOnly = true)
    public List<QuestionResDtoV2> getQuestionResDataV2(Integer avatarId) {
        List<QuestionResDto> questionResDtos = questionResData(avatarId);

        return questionResDtos.stream().map(questionResDto ->
            QuestionResDtoV2.builder().questionResId(questionResDto.getQuestionResId())
                    .questionType(questionResDto.getQuestionType())
                    .questionId(questionResDto.getQuestionId())
                    .answer(questionResDto.getQuestionType().equals('c') ? questionResDto.getChoiceAnswer().getNumber().toString() : questionResDto.getSubjectiveAnswer() )
                    .build()
        ).toList();
    }

    @Transactional(readOnly = true)
    public String getInstruction(Avatar avatar) {
        List<QuestionResDto> questionResDtos = questionResData(avatar.getId());
        String avatarName = avatar.getName();

        return getInstruction(questionResDtos, avatarName);
    }

    public String getInstruction(List<QuestionResDto> dtos, String avatarName) {
        StringBuilder sb = new StringBuilder();
        for (QuestionResDto questionResDto : dtos) {
            sb.append(avatarName).append("의 ");
            sb.append(questionResDto.getQuestion()).append(" ");
            if (questionResDto.getQuestionType().equals('c')) {
                sb.append(questionResDto.getChoiceAnswer().getDescription());
            } else {
                sb.append(questionResDto.getSubjectiveAnswer());
            }
            sb.append(" 입니다. \n");
        }

        return sb.toString();
    }

    private List<QuestionResDto> questionResData(Integer avatarId) {
        List<QuestionResData> questionResDataList = questionResDataRepository.findAllByAvatarId(avatarId);
        List<QuestionData> questionAll = searchQuestionService.findAll();

        List<QuestionResDto> dtos = new ArrayList<>();

        for (QuestionData questionData : questionAll) {
            for (QuestionResData questionResData : questionResDataList) {
                if (questionData.getQuestionId().equals(questionResData.getQuestionData().getQuestionId())) {
                    QuestionResDto dto = QuestionResDto.builder()
                            .questionResId(questionResData.getQuestionResId())
                            .questionChoices(questionData.getQuestionChoiceList())
                            .choiceAnswer(questionResData.getChoice())
                            .questionType(questionData.getType())
                            .question(questionData.getDescription())
                            .questionId(questionData.getQuestionId())
                            .subjectiveAnswer(questionResData.getSubjectiveAns())
                            .build();
                    dtos.add(dto);
                    break;
                }
            }
        }

        return dtos;
    }
}
