package com.mine.application.user.command.application;

import com.mine.application.user.command.domain.Gender;
import com.mine.application.user.command.domain.Password;
import com.mine.application.user.command.domain.User;
import com.mine.application.user.command.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SignupService {

    private final UserRepository userRepository;

    public void signup(SignupRequest signupRequest) {
        Password password = Password.of(signupRequest.getPassword(), false);
        Gender gender = Gender.of(signupRequest.getGender());
        User user = User.builder()
                .email(signupRequest.getEmail())
                .nickname(signupRequest.getNickname())
                .gender(gender)
                .password(password)
                .build();

        //TODO : 이메일 인증 기능 추가할 것
        userRepository.save(user);

    }
}
