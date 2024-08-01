package com.mine.application.schedule.ui;

import com.mine.application.schedule.command.application.*;
import com.mine.application.schedule.query.application.ScheduleQueryService;
import com.mine.application.schedule.ui.dto.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true")
public class ScheduleController {

    private final ScheduleQueryService scheduleQueryService;
    private final GetScheduleByChatService getScheduleByChatService;
    private final AddScheduleService addScheduleService;
    private final UpdateScheduleService updateScheduleService;
    private final DeleteScheduleService deleteScheduleService;
    private final GetScheduleCategoryService getScheduleCategoryService;

    @GetMapping("/users/schedules")
    public ResponseEntity<List<GetScheduleResponse>> getSchedulesBetweenDates(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate)
    {
        return ResponseEntity.ok().body(scheduleQueryService.getSchedulesBetweenDates(startDate, endDate));
    }

    @GetMapping("/users/schedules/calendar")
    public ResponseEntity<List<GetScheduleResponse>> getSchedulesByContaining(@RequestParam String query) {
        return ResponseEntity.ok(scheduleQueryService.getSchedulesByContaining(query));
    }

    @GetMapping("/users/schedules/chat")
    public ResponseEntity<String> getSchedulesByChat(@RequestParam String query) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(getScheduleByChatService.getScheduleByChat(query));
    }

    @PostMapping("/users/schedules/calendar")
    public ResponseEntity<Void> addScheduleFromCalendar(@RequestBody @Valid AddScheduleFromCalendarRequest addScheduleFromCalendarRequest) {
        addScheduleService.addScheduleFromCalendar(addScheduleFromCalendarRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/schedules/chat")
    public ResponseEntity<AddScheduleFromChatResponse> addScheduleFromChat(@RequestBody @Valid AddScheduleFromChatRequest addScheduleFromChatRequest) {
        return ResponseEntity.ok().body(addScheduleService.addScheduleFromChat(addScheduleFromChatRequest.getQuery()));
    }

    @PatchMapping("/users/schedule")
    public ResponseEntity<Void> updateSchedule(@RequestBody @Valid UpdateScheduleRequest updateScheduleRequest) {
        updateScheduleService.updateSchedule(updateScheduleRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/schedules/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable @NotNull int scheduleId) {
        deleteScheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/schedule/schedule-category/{scheduleCategoryId}")
    public ResponseEntity<String> getScheduleCategory(@PathVariable @NotNull Integer scheduleCategoryId) {
        return ResponseEntity.ok().body(getScheduleCategoryService.getScheduleCategory(scheduleCategoryId));
    }

}
