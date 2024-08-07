package com.mine.application.achievement.ui;

import com.mine.application.achievement.command.application.GetAchievedCountService;
import com.mine.application.achievement.command.application.UpdateAchievementStateService;
import com.mine.application.achievement.query.AchievementStateQueryService;
import com.mine.application.achievement.ui.dto.GetAchievedCountResponse;
import com.mine.application.achievement.ui.dto.GetAchievementStateResponse;
import com.mine.application.common.aop.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
@RequestMapping("/users/achievements")
@RestController
public class AchievementController {

    private final AchievementStateQueryService achievementStateQueryService;
    private final UpdateAchievementStateService updateAchievementStateService;
    private final GetAchievedCountService getAchievedCountService;

    @LoginCheck
    @GetMapping
    public ResponseEntity<List<GetAchievementStateResponse>> getAchievementStates() {
        return ResponseEntity.ok().body(achievementStateQueryService.getAchievementStates());
    }

    @LoginCheck
    @PutMapping("/{achievementId}")
    public ResponseEntity<Boolean> updateAchievementState(@PathVariable Integer achievementId) {
        return ResponseEntity.ok().body(updateAchievementStateService.updateAchievementState(achievementId));
    }

    @LoginCheck
    @GetMapping("/count")
    public ResponseEntity<GetAchievedCountResponse> getAchievedCount() {
        return ResponseEntity.ok().body(getAchievedCountService.getAchievedCount());
    }

}
