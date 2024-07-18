package com.mine.application.user.query;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserQueryService {
    private final UserDataRepository userDataRepository;

    public boolean existUserId(String email) {
        return userDataRepository.existsByEmail(email);
    }
    public UserData getUserData(String email) {
        return userDataRepository.findByEmail(email);
    }
}
