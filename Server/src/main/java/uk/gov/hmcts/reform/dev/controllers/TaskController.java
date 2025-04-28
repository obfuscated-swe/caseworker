package uk.gov.hmcts.reform.dev.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.validation.Valid;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.services.TaskService;

import static org.springframework.http.ResponseEntity.ok;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@Validated
public class TaskController {

    private static final Logger logger = LogManager.getLogger(TaskController.class);

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Gets one task with the given ID")
    @ApiResponses({@ApiResponse(responseCode = "200")})
    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<Task> getTask(@RequestParam int id) {
        logger.info("Fetching task with ID: {}", id);
        Task task = taskService.getTask(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ok(task);
    }

    @Operation(summary = "Get all tasks with pagination and optional filtering")
    @ApiResponses({@ApiResponse(responseCode = "200")})
    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<Page<Task>> getAllTasks(
        @Parameter(description = "Page number (zero-based)") @RequestParam(defaultValue = "0") int page,
        @Parameter(description = "Number of items per page") @RequestParam(defaultValue = "20") int size,
        @Parameter(description = "Filter by task statuses") @RequestParam(required = false) List<TaskStatus> statuses,
        @Parameter(description = "Filter by case number") @RequestParam(required = false) Integer caseNumber,
        @Parameter(description = "Sort order (ascending/descending)") @RequestParam(
            defaultValue = "ascending") String order) {

        logger.info(
            "Fetching all tasks: page={}, size={} statuses={} caseNumber={} order={}",
            page, size, statuses, caseNumber, order
        );
        Page<Task> tasks = taskService.getAllTasks(page, size, statuses, caseNumber, order);

        return ResponseEntity.ok(tasks);
    }

    @Operation(summary = "Posts one task that is valid")
    @ApiResponses({@ApiResponse(responseCode = "201")})
    @PostMapping(value = "/add", produces = "application/json")
    public ResponseEntity<Void> addTask(@Valid @RequestBody Task task) {
        logger.info("Adding new task: {}", task);

        taskService.addTask(task);

        return ResponseEntity.status(201).build();
    }

    @Operation(summary = "Updated one task that is valid")
    @ApiResponses({@ApiResponse(responseCode = "200")})
    @PutMapping(value = "/update", produces = "application/json")
    public ResponseEntity<Void> updateTask(@Valid @RequestBody Task task) {
        logger.info("Updating task: {}", task);
        taskService.updateTask(task);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Deletes one task with the given ID")
    @ApiResponses({@ApiResponse(responseCode = "204")})
    @DeleteMapping(value = "/delete/", produces = "application/json")
    public ResponseEntity<Void> deleteTask(@RequestParam int id) {
        logger.info("Deleting task with ID: {}", id);
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
