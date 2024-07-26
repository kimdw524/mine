package com.mine.application.user.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.user.command.domain.Gender;
import com.mine.application.user.command.domain.Password;
import com.mine.application.user.command.domain.User;
import com.mine.application.user.command.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SignupService {

    private final UserRepository userRepository;
    private final SessionDao sessionDao;

    public void signup(SignupRequest signupRequest) {
        validEmail(signupRequest.getEmail());

        Password password = Password.of(signupRequest.getPassword(), false);
        Gender gender = Gender.of(signupRequest.getGender());

        User user = User.builder()
                .email(signupRequest.getEmail())
                .nickname(signupRequest.getNickname())
                .gender(gender)
                .password(password)
                .build();

        sessionDao.remove(SessionConstants.EMAIL_VERIFICATION);

        userRepository.save(user);

    }

    private void validEmail(String email) {
        if(userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        Optional<Object> optionalO = sessionDao.get(SessionConstants.EMAIL_VERIFICATION);
        if(optionalO.isEmpty()) {
            throw new IllegalArgumentException("Is not valid access");
        }

        UserVerificationEmailDto dto = (UserVerificationEmailDto) optionalO.get();
        if(!dto.canUse()) {
            throw new IllegalArgumentException("Is not valid access");
        }

    }
}
