package com.mine.application.avatar.command.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface AvatarRepository extends Repository<Avatar, Integer> {

    Avatar save(Avatar avatar);

    @Query("SELECT a FROM Avatar a WHERE a.id = :id AND a.isDeleted = false")
    Optional<Avatar> findById(Integer id);

    @Query("SELECT a FROM Avatar a JOIN FETCH a.questionResList WHERE a.id = :id AND a.userId = :userId")
    Optional<Avatar> findAvatarInAllDataByIdAndUserId(@Param("id") Integer id, @Param("userId") Integer userId);

    @Query("SELECT COUNT(id) FROM Avatar WHERE userId = :userId AND isDeleted = false")
    Integer countAvatarByUserId(@Param(value = "userId") Integer userId);

    @Query("SELECT avatar FROM Avatar avatar WHERE avatar.userId = :userId AND avatar.isDeleted = false AND avatar.id != :avatarId")
    Optional<Avatar> findAvatarByUserIdAndNotAvatarId(@Param(value = "userId")Integer userId, @Param(value = "avatarId") Integer avatarId);

}
