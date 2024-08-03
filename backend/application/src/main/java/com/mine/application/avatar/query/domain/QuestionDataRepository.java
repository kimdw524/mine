package com.mine.application.avatar.query.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface QuestionDataRepository extends Repository<QuestionData, Integer> {


    @Query("SELECT DISTINCT qd FROM QuestionData qd LEFT JOIN FETCH qd.questionChoiceList ORDER BY qd.id")
    List<QuestionData> queryAll();
}
