package com.mine.application.achievement.ui;

import com.mine.application.achievement.command.application.UpdateCountService;
import com.mine.application.common.aop.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController("/user/achieve")
public class AchieveController {

    private final UpdateCountService updateCountService;

    @LoginCheck
    @GetMapping
    public ResponseEntity<?> getAchievementStates() {
        return ResponseEntity.ok().build();
    }

    @LoginCheck
    @PostMapping("/{achievementId}")
    public ResponseEntity<Boolean> updateCount(@PathVariable Integer achievementId) {
        return ResponseEntity.ok(updateCountService.updateCount(achievementId));
    }

}
