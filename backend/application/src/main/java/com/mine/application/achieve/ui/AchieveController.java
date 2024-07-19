package com.mine.application.achieve.ui;

import com.mine.application.achieve.command.application.UpdateRateService;
import com.mine.application.common.aop.LoginCheck;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController("/user/achieve")
public class AchieveController {

    private final UpdateRateService updateRateService;
    private final SessionDao sessionDao;

    @LoginCheck
    @GetMapping
    public ResponseEntity<?> getAchieveStates() {
        return ResponseEntity.ok().build();
    }

    @LoginCheck
    @PostMapping("/{sortId}")
    public ResponseEntity<Boolean> updateRate(@PathVariable Integer sortId) {
        return ResponseEntity.ok(updateRateService.updateRate(
                (String) sessionDao.get(SessionConstants.EMAIL).get(), sortId));
    }



}
