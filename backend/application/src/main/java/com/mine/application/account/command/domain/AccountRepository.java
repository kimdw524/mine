package com.mine.application.account.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AccountRepository extends Repository<Account, Integer> {

    Optional<Account> findById(Integer id);

    void save(Account account);

    void delete(Account account);

}
