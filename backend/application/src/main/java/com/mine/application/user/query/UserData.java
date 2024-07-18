package com.mine.application.user.query;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserData {
    @Id
    private Integer id;
    @Column String name;
    @Column String email;
    @Column String password;
    @Column(name="phone_num") String phoneNum;
}
