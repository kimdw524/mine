package com.mine.application.user.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, Integer> {
    Optional<User> findById(Integer userId);

    void save(User user);

    boolean existsById(Integer userId);

    Optional<User> findByEmail(String email);
}
