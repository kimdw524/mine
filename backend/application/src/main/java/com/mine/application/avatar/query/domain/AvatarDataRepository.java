package com.mine.application.avatar.query.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AvatarDataRepository extends Repository<AvatarData, Integer> {

    @Query("SELECT a FROM AvatarData a WHERE a.isDeleted = false AND a.userId = :userId")
    List<AvatarData> findAllByUserId(@Param("userId")Integer userId);
}
