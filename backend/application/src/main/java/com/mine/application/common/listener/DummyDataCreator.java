package com.mine.application.common.listener;

import com.mine.application.user.command.domain.user.Gender;
import com.mine.application.user.command.domain.user.Password;
import com.mine.application.user.command.domain.user.User;
import com.mine.application.user.command.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Component
public class DummyDataCreator implements ApplicationListener<ContextRefreshedEvent> {

    private final UserRepository userRepository;
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
//        createUsers();
//        RestTemplate restTemplate = new RestTemplate();
    }


    private void createUsers() {
        createUserIfNotNull(1, "khj745700@naver.com", "testtest1", "M", "테스트객체");
        createUserIfNotNull(2, "yoha6865@naver.com", "password1234", "F", "토스개발자");
        createUserIfNotNull(3, "tjs2194@naver.com", "password1", "F", "미래의토스인");
        createUserIfNotNull(4, "dydwls9703@naver.com", "test123123", "M", "토스트뱅크");
    }

    private void createUserIfNotNull(Integer id, String email, String password, String gender, String nickname) {
        Optional<User> byId = userRepository.findById(id);

        if(byId.isPresent()) {
            return;
        }

        User user = User.builder()
                .id(id)
                .email(email)
                .gender(Gender.of(gender))
                .password(Password.of(password, false))
                .nickname(nickname)
                .build();

        userRepository.save(user);
    }
}
