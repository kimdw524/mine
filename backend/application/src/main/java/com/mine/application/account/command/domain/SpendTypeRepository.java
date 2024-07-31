package com.mine.application.account.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface SpendTypeRepository extends Repository<SpendType, Integer> {

    Optional<SpendType> findById(Integer id);

}
