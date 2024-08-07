package com.mine.application.user.command.application;

import com.mine.application.achievement.command.application.AddAchievementStatesService;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.user.command.domain.user.Gender;
import com.mine.application.user.command.domain.user.Password;
import com.mine.application.user.command.domain.user.User;
import com.mine.application.user.command.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SignupService {

    private final UserRepository userRepository;
    private final SessionDao sessionDao;
    private final AddAchievementStatesService addAchievementStatesService;

    @Transactional
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

        addAchievementStatesService.addAchievementStates(user.getId());
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
