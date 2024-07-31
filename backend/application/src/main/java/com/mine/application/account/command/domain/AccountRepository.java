package com.mine.application.account.command.domain;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends Repository<Account, Integer> {

    Optional<Account> findById(Integer id);

    List<Account> findAllByUserId(Integer userId);

    void save(Account account);

    void delete(Account account);

}
