package com.mine.application.user.query;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserQueryService {
    private final UserDataRepository userDataRepository;
    private final PasswordEncoder passwordEncoder;
    private final SessionDao sessionDao;

    public boolean existUserId(String email) {
        return userDataRepository.existsByEmail(email);
    }
    public UserData getUserData(String email) {
        return userDataRepository.findByEmail(email);
    }
    public boolean isEqualsPassword(PasswordDto dto) {
        Integer sessionId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();

        UserData findUser = userDataRepository.findById(sessionId);

        return findUser.isEqualsPassword(dto.getPassword(), passwordEncoder);
    }
}
