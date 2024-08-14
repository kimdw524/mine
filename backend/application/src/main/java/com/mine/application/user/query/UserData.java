package com.mine.application.user.query;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Entity
@Table(name="user")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Immutable
@SQLRestriction("is_deleted = false")
public class UserData {
    @Id
    @Column(name = "user_id")
    private Integer id;

    @Getter
    @Column(name = "user_email")
    String email;

    @Getter
    @Column(name = "user_nickname")
    String nickname;

    @Getter
    @Column(name = "user_gender")
    String gender;

    @Column(name = "user_password")
    String password;

    public boolean isEqualsPassword(String password, PasswordEncoder encoder) {
        return encoder.matches(password, this.password);
    }
}
