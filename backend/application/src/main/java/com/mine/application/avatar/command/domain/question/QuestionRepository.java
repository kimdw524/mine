package com.mine.application.avatar.command.domain.question;


import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface QuestionRepository extends Repository<Question, Integer> {
    Optional<Question> findById(Integer id);
}
