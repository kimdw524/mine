package com.mine.application.avatar.query.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface QuestionDataRepository extends Repository<QuestionData, Integer> {

    @Query("SELECT qd FROM QuestionData qd LEFT JOIN FETCH qd.questionChoiceList")
    List<QuestionData> queryAll();
}
