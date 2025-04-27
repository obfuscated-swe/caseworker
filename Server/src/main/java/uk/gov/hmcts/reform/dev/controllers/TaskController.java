package uk.gov.hmcts.reform.dev.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.services.TaskService;

import static org.springframework.http.ResponseEntity.ok;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
@Validated
public class TaskController {

    private static final Logger logger = LogManager.getLogger(TaskController.class);

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<Task> getTask(@RequestParam int id) {
        logger.info("Fetching task with ID: {}", id);
        Task task = taskService.getTask(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ok(task);
    }

    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<Page<Task>> getAllTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) List<TaskStatus> statuses,
            @RequestParam(required = false) Integer caseNumber,
            @RequestParam(defaultValue = "ascending") String order) {

        logger.info("Fetching all tasks: page={}, size={} statuses={} caseNumber={} order={}",
                page, size, statuses, caseNumber, order);
        Page<Task> tasks = taskService.getAllTasks(page, size, statuses, caseNumber, order);

        return ResponseEntity.ok(tasks);
    }

    @PostMapping(value = "/add", produces = "application/json")
    public ResponseEntity<Void> addTask(@Valid @RequestBody Task task) {
        logger.info("Adding new task: {}", task);

        taskService.addTask(task);

        return ResponseEntity.status(201).build();
    }

    @PutMapping(value = "/update", produces = "application/json")
    public ResponseEntity<Void> updateTask(@Valid @RequestBody Task task) {
        logger.info("Updating task: {}", task);
        taskService.updateTask(task);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/delete", produces = "application/json")
    public ResponseEntity<Void> deleteTask(@RequestParam int id) {
        logger.info("Deleting task with ID: {}", id);
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
