package com.mine.application.user.command.domain;


import com.mine.application.common.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
@Entity
@SuperBuilder
public class User extends BaseEntity {
    @EmbeddedId
    private UserId id;

    @Convert(converter = PasswordConverter.class)
    @Column(name = "password", nullable = false)
    private Password password;

    @Convert(converter = MBTIConverter.class)
    @Column(name = "mbti")
    private MBTI mbti;

    private String name;

    @Column(name = "phone_num")
    private String phoneNum;

    @Convert(converter = GenderConverter.class)
    private Gender gender;

    public User(UserId id, Password password, MBTI mbti, String name, Gender gender) {
        this.id = id;
        this.password = password;
        this.mbti = mbti;
        this.name = name;
        this.gender = gender;
    }

}
