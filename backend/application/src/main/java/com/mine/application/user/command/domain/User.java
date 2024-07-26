package com.mine.application.user.command.domain;


import com.mine.application.common.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "user")
@Entity
@SuperBuilder
@DynamicUpdate
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Convert(converter = PasswordConverter.class)
    @Column(name = "password", nullable = false)
    private Password password;

//    @Convert(converter = MBTIConverter.class)
//    @Column(name = "mbti")
//    private MBTI mbti;

    private String nickname;

    @Convert(converter = GenderConverter.class)
    private Gender gender;

    @Column(name = "email")
    private String email;

    public User(Password password, String nickname, Gender gender, String email) {

        this.password = password;
//        this.mbti = mbti;
        this.nickname = nickname;
        this.gender = gender;
        this.email = email;
    }

}
