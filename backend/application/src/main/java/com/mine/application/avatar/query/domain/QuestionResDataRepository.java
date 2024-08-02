package com.mine.application.avatar.query.domain;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface QuestionResDataRepository extends Repository<QuestionResData, Integer> {

    @Query("SELECT qrd FROM QuestionResData qrd JOIN FETCH qrd.questionData, qrd.questionData.questionChoiceList WHERE qrd.avatarData.id = :avatarId")
    List<QuestionResData> findAllBy(@Param("avatarId")Integer avatarId);
}
