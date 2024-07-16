package com.mine.application.user.command.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Converter(autoApply = true)
class PasswordConverter implements AttributeConverter<Password, String> {
    private static PasswordEncoder encoder;

    static void setPasswordEncoder(PasswordEncoder encoder) {
        PasswordConverter.encoder = encoder;
    }
    @Override
    public String convertToDatabaseColumn(Password password) {
        if(password.isEncoded()) {
            return password.getValue();
        }
        return encoder.encode(password.getValue());
    }

    @Override
    public Password convertToEntityAttribute(String s) {
        return Password.of(s, true);
    }
}
