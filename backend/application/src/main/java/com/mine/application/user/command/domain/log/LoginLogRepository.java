package com.mine.application.user.command.domain.log;

import org.springframework.data.repository.Repository;

import java.time.LocalDateTime;
import java.util.List;

public interface LoginLogRepository extends Repository<LoginLog, Integer> {
    void save(LoginLog loginLog);

    List<LoginLog> findByUserIdAndLoginTimeBetween(Integer userId, LocalDateTime from, LocalDateTime to);
}
