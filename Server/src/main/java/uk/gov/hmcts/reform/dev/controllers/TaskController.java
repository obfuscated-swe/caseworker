package uk.gov.hmcts.reform.dev.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.services.TaskService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

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
    public ResponseEntity<List<Task>> getAllTasks() {
        logger.info("Fetching all tasks");
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping(value = "/add", produces = "application/json")
    public ResponseEntity<Void> addTask(@Valid @RequestBody Task task) {
        logger.info("Adding new task: {}", task);
        logger.info("Task CaseNumber: {}", task.getCaseNumber());

        Task exists = taskService.getTaskByCaseNumber(task.getCaseNumber());
        if (exists != null) {
            logger.error("Task with CaseNumber {} already exists", task.getCaseNumber());
            return ResponseEntity.status(409).build();
        }

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
