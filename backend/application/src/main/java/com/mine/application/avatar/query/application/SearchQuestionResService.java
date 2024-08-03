package com.mine.application.avatar.query.application;

import com.mine.application.avatar.query.domain.QuestionData;
import com.mine.application.avatar.query.domain.QuestionResData;
import com.mine.application.avatar.query.domain.QuestionResDataRepository;
import com.mine.application.avatar.query.domain.QuestionResDto;
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

    @Transactional(readOnly = true)
    public String getInstruction(Integer avatarId) {
        List<QuestionResDto> questionResDtos = questionResData(avatarId);

        StringBuilder sb = new StringBuilder();
        for (QuestionResDto questionResDto : questionResDtos) {
            sb.append(questionResDto.getQuestion()).append(" 라는 질문에는 `");
            if (questionResDto.getQuestionType().equals('c')) {
                sb.append(questionResDto.getChoiceAnswer().getDescription());
            } else {
                sb.append(questionResDto.getSubjectiveAnswer());
            }
            sb.append("`라고 답했어. \n");
        }

        return sb.toString();
    }

    @Transactional(readOnly = true)
    public List<QuestionResDto> questionResData(Integer avatarId) {
        List<QuestionResData> questionResDataList = questionResDataRepository.findAllByAvatarIdOrderByQuestionData(avatarId);
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
