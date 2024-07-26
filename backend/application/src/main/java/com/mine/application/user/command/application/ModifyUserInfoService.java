package com.mine.application.user.command.application;

import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import com.mine.application.user.command.domain.user.User;
import com.mine.application.user.command.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ModifyUserInfoService {
    private final UserRepository userRepository;
    private final SessionDao sessionDao;

    @Transactional
    public void modifyUserInfo(ModifyUserInfoRequest request) {
        Integer sessionId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();

        User findUser = userRepository.findById(sessionId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        findUser.updateUserInfo(request);
    }

    @Transactional
    public void modifyPasswordBySession(ModifyPasswordRequest request) {
        Integer sessionId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        User findUser = userRepository.findById(sessionId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        findUser.updateUserPassword(request);
    }

    @Transactional
    public void modifyPasswordByEmailValidation(ModifyPasswordRequest request) {
        Integer sessionId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        Optional<Object> emailValidInfo = sessionDao.get(SessionConstants.EMAIL_VERIFICATION);

        if(emailValidInfo.isEmpty()) {
            throw new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND);
        }

        UserVerificationEmailDto emailDto = (UserVerificationEmailDto) emailValidInfo.get();

        if(!emailDto.canUse()){
            throw new IllegalArgumentException("invalid access");
        }

        User findUser = userRepository.findById(sessionId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        findUser.updateUserPassword(request);

        sessionDao.remove(SessionConstants.EMAIL_VERIFICATION);
    }

    @Transactional
    public void withdraw() {
        Integer sessionId = (Integer) sessionDao.get(SessionConstants.USER_ID).get();
        User findUser = userRepository.findById(sessionId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        findUser.withdraw();
        sessionDao.removeAll();
    }
}
