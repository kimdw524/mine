package com.mine.application.user.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, UserId> {
    Optional<User> findById(UserId userId);

    void save(User user);

    boolean existsById(UserId userId);
}
