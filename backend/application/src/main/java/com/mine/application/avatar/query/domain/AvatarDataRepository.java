package com.mine.application.avatar.query.domain;

import com.mine.application.avatar.command.domain.voice.Voice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AvatarDataRepository extends Repository<AvatarData, Integer> {

    @Query("SELECT a FROM AvatarData a WHERE a.isDeleted = false AND a.userId = :userId")
    List<AvatarData> findAllByUserId(@Param("userId")Integer userId);

    @Query("SELECT a.voiceId FROM AvatarData a WHERE a.isDeleted = false AND a.userId = :userId AND a.avatarId = :avatarId")
    Optional<Voice> findAvatarDataByUserIdAndAvatarId(@Param("userId")Integer userId, @Param("avatarId")Integer avatarId);
}
