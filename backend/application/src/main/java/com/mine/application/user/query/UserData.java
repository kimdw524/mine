package com.mine.application.user.query;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Table(name="user")

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Immutable
public class UserData {
    @Id
    private Integer id;

    @Getter
    @Column String nickname;

    @Getter
    @Column String email;

    @Column String password;


    public boolean isEqualsPassword(String password, PasswordEncoder encoder) {
        return encoder.matches(password, this.password);
    }
}
