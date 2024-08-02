package com.mine.application.avatar.query.domain;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface AvatarDataRepository extends Repository<AvatarData, Integer> {

    List<AvatarData> findAllByUserId(Integer userId);
}
