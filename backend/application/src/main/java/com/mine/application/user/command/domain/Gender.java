package com.mine.application.user.command.domain;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

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
        if(val.equals("F"))
            return new Gender(Type.FEMALE);

        return new Gender(Type.MALE);
    }

    @Override
    public boolean equals(Object obj) {
        if(obj == this) {
            return true;
        }
        if( obj == null || obj.getClass() != this.getClass()) {
            return false;
        }
        Gender gender = (Gender) obj;
        return type.equals(gender.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(type.hashCode());
    }

}
