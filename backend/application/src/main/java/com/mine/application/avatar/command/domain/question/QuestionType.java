package com.mine.application.avatar.command.domain.question;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum QuestionType {
    SUBJECT('s'),
    CHOICE('c')
    ;

    private final Character value;

    public static QuestionType of(Character c) {
        if(c.equals('s')){
            return SUBJECT;
        }

        if(c.equals('c')) {
            return CHOICE;
        }

        throw new IllegalArgumentException("Invalid arguement exception");
    }
}
