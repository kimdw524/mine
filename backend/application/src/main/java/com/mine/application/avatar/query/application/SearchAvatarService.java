package com.mine.application.avatar.query.application;

import com.mine.application.avatar.query.domain.AvatarData;
import com.mine.application.avatar.query.domain.AvatarDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchAvatarService {

    private final AvatarDataRepository avatarDataRepository;

    public List<AvatarData> findAllAvatarByUserId(Integer userId) {
        return avatarDataRepository.findAllByUserId(userId);
    }
}
