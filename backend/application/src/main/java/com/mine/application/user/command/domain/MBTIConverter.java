package com.mine.application.user.command.domain;

import jakarta.persistence.AttributeConverter;

public class MBTIConverter implements AttributeConverter<MBTI, String> {
    @Override
    public String convertToDatabaseColumn(MBTI mbti) {
        if(mbti == null) return null;
        return mbti.toString();
    }

    @Override
    public MBTI convertToEntityAttribute(String s) {
        if(s == null) return null;
        return MBTI.of(s);
    }
}
