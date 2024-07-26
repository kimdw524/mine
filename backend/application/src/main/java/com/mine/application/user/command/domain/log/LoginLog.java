package com.mine.application.user.command.domain.log;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table
@NoArgsConstructor
@Getter
public class LoginLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_log_id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column
    private LocalDateTime loginTime;

    public LoginLog(Integer userId) {
        this.userId = userId;
        this.loginTime = LocalDateTime.now();
    }
}
