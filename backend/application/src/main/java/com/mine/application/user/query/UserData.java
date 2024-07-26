package com.mine.application.user.query;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

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

}
