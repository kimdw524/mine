package com.mine.application.user.command.domain;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Gender {
    private Type type;

    public enum Type {
        FEMALE("F"), MALE("M");

        private final String value;
        Type(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public Gender(Type type) {
        this.type = type;
    }

    public Type getType() {
        return type;
    }

    public static Gender of(String val) {
        return new Gender(Type.valueOf(val));
    }
}
