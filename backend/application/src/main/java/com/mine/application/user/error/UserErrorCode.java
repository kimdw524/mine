package com.mine.application.user.error;

import com.mine.application.common.erros.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum UserErrorCode implements ErrorCode {
    PASSWORD_IS_SAME(HttpStatus.BAD_REQUEST, "비밀번호가 같습니다. 다른 비밀번호를 작성해주세요.");

    private final HttpStatus httpStatus;
    private final String message;

}
