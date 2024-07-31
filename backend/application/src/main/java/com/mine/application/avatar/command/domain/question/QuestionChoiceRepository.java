package com.mine.application.avatar.command.domain.question;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface QuestionChoiceRepository extends Repository<QuestionChoice, Integer> {

    Optional<QuestionChoice> findByQuestionId(Integer questionId);
}
