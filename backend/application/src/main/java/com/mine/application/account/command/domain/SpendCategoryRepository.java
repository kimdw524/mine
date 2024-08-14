package com.mine.application.account.command.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface SpendCategoryRepository extends Repository<SpendCategory, Integer> {

    Optional<SpendCategory> findById(Integer id);

}
