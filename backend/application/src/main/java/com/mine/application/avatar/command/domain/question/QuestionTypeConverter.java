package com.mine.application.avatar.command.domain.question;

import jakarta.persistence.AttributeConverter;

public class QuestionTypeConverter implements AttributeConverter<QuestionType, Character> {
    @Override
    public Character convertToDatabaseColumn(QuestionType attribute) {
        return attribute.getValue();
    }

    @Override
    public QuestionType convertToEntityAttribute(Character dbData) {
        return QuestionType.of(dbData);
    }
}
