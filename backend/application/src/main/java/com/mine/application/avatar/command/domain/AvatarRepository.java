package com.mine.application.avatar.command.domain;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;


public interface AvatarRepository extends Repository<Avatar, Integer> {

    void save(Avatar avatar);

    Optional<Avatar> findById(Integer id);

    @Query("SELECT COUNT(id) FROM Avatar WHERE userId = :userId")
    Integer countAvatarByUserId(@Param(value = "userId") Integer userId);
}
