package com.mine.application.user.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.user.command.domain.Password;
import com.mine.application.user.command.domain.User;
import com.mine.application.user.command.domain.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LoginService {
    private final UserRepository userRepository;
    private final SessionDao sessionDao;

    public void login(LoginRequest loginRequest) {
        Optional<User> findUser = userRepository.findByEmail(loginRequest.getEmail());
        if (findUser.isPresent()) {
            User user = findUser.get();
            if (user.getPassword().equals(Password.of(loginRequest.getPassword(), false))) {
                sessionDao.put(SessionConstants.EMAIL, loginRequest.getEmail());
                sessionDao.put(SessionConstants.USER_ID, user.getId());
            }
        }
        // throw error;
    }

    public void loginCheck() {
        // TODO : 예외 처리 필요
        assert sessionDao.get(SessionConstants.EMAIL) != null;
    }

    public void logout() {
        sessionDao.remove(SessionConstants.EMAIL);
    }

}
