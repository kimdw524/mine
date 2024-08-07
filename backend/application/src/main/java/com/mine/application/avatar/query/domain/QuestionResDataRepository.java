package com.mine.application.avatar.query.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionResDataRepository extends Repository<QuestionResData, Integer> {

    @Query("SELECT qrd FROM QuestionResData qrd JOIN AvatarData a ON qrd.avatar.avatarId = a.avatarId WHERE a.avatarId = :avatarId AND a.isDeleted = false")
    List<QuestionResData> findAllByAvatarId(@Param("avatarId") Integer avatarId);


}
