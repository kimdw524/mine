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
    private static final String url = "http://localhost:8080/";
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createUsers();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> forEntity = restTemplate.getForEntity(url, null);
        log.error(forEntity.getStatusCode().toString());
    }


    private void createUsers() {
        createUserIfNotNull(1, "khj745700@naver.com", "testtest1", "M", "테스트객체");
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
