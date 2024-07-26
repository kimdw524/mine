package com.mine.application.user.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.event.Events;
import com.mine.application.common.infra.mailsender.MailSenderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {
    private final SessionDao sessionDao;
    private final String
    public void emailNumberRequest(EmailVerificationNumRequest request) {
        String randomNumStr = GenerateRandomNumber.getStr(6);

        UserVerificationEmailDto userVerificationEmailDto =  UserVerificationEmailDto.builder()
                .email(request.getEmail())
                .verificationNumber(randomNumStr)
                .build();

        sessionDao.put(SessionConstants.EMAIL_VERIFICATION, userVerificationEmailDto);
        Events.raise(MailSenderRequest.builder()
                        .toEmail(request.getEmail())
                        .subject("[Mine]회원가입을 위한 이메일 인증 코드 발송 안내입니다.")
                        .variables(Map.of("verification-number", randomNumStr))
                        .templatePath("email-verification-number-template.html")
                .build()

        );
    }
}
