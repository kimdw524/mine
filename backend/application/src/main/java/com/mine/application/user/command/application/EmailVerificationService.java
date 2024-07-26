package com.mine.application.user.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.event.Events;
import com.mine.application.common.infra.mailsender.MailSenderRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {
    private static final Logger log = LoggerFactory.getLogger(EmailVerificationService.class);
    private final SessionDao sessionDao;

    public void emailNumberRequest(EmailVerificationNumRequest request) {
        String randomNumStr = GenerateRandomNumber.getStr(6);

        UserVerificationEmailDto userVerificationEmailDto = UserVerificationEmailDto.builder()
                .email(request.getEmail())
                .verificationNumber(randomNumStr)
                .build();

        sessionDao.put(SessionConstants.EMAIL_VERIFICATION, userVerificationEmailDto);

        Events.raise(MailSenderRequest.builder()
                .toEmail(request.getEmail())
                .subject("[Mine]이메일 인증 코드 발송 안내입니다.")
                .variables(Map.of("verificationNumber", randomNumStr))
                .templatePath("email-verification-number-template")
                .build()
        );
    }

    public boolean verifyEmail(EmailVerificationRequest request) {
        Optional<Object> object = sessionDao.get(SessionConstants.EMAIL_VERIFICATION);
        UserVerificationEmailDto userVerificationEmailDto = (UserVerificationEmailDto) object.get();
        if(userVerificationEmailDto.verify(request.getNumber())) {
            sessionDao.put(SessionConstants.EMAIL_VERIFICATION, userVerificationEmailDto);
            return true;
        }
        return false;
    }
}
