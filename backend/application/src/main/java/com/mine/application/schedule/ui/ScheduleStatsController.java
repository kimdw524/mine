package com.mine.application.schedule.ui;

import com.mine.application.schedule.query.application.ScheduleStatsService;
import com.mine.application.schedule.ui.dto.GetScheduleStatsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(originPatterns = "*", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/users/statistics/schedule")
@RequiredArgsConstructor
@RestController
public class ScheduleStatsController {

    private final ScheduleStatsService scheduleStatsService;

    @GetMapping
    public ResponseEntity<List<GetScheduleStatsResponse>> getScheduleStats(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        return ResponseEntity.ok()
                .body(scheduleStatsService.getScheduleStats(startDate, endDate));
    }

}
