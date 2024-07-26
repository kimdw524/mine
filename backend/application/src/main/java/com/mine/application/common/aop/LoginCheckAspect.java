package com.mine.application.common.aop;

import com.mine.application.user.command.application.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Component
@Aspect
public class LoginCheckAspect {
    private final LoginService loginService;

    @Around("@annotation(com.mine.application.common.aop.LoginCheck)")
    public Object loginCheck(ProceedingJoinPoint joinPoint) throws Throwable {
        loginService.loginCheck();
        return joinPoint.proceed();
    }
}
