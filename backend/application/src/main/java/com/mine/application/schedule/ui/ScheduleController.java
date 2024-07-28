package com.mine.application.schedule.ui;

import com.mine.application.schedule.command.application.AddScheduleService;
import com.mine.application.schedule.command.application.DeleteScheduleService;
import com.mine.application.schedule.command.application.UpdateScheduleService;
import com.mine.application.schedule.ui.dto.AddScheduleRequest;
import com.mine.application.schedule.ui.dto.UpdateScheduleRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RequiredArgsConstructor
@RequestMapping("/users/schedules")
@RestController
public class ScheduleController {

    private final AddScheduleService addScheduleService;
    private final UpdateScheduleService updateScheduleService;
    private final DeleteScheduleService deleteScheduleService;

    @GetMapping
    public ResponseEntity<?> getSchedulesBetweenDates(
            @RequestParam @NotBlank LocalDate startDate,
            @RequestParam LocalDate endDate)
    {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/calendar")
    public ResponseEntity<Void> addSchedule(@RequestBody @Valid AddScheduleRequest addScheduleRequest) {
        addScheduleService.addSchedule(addScheduleRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping
    public ResponseEntity<Void> updateSchedule(@RequestBody @Valid UpdateScheduleRequest updateScheduleRequest) {
        updateScheduleService.updateSchedule(updateScheduleRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable @Min(0) int scheduleId) {
        deleteScheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.ok().build();
    }

}
