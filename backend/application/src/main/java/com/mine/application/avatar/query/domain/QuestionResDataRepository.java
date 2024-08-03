package com.mine.application.avatar.query.domain;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface QuestionResDataRepository extends Repository<QuestionResData, Integer> {

    @Query("SELECT DISTINCT qrd FROM QuestionResData qrd LEFT JOIN FETCH qrd.choice c  WHERE qrd.avatarId = :avatarId")
    List<QuestionResData> findAllByAvatarIdOrderByQuestionData(Integer avatarId);
}
