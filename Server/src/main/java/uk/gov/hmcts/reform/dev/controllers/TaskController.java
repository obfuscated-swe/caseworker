package uk.gov.hmcts.reform.dev.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.services.TaskService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/tasks")
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
    public ResponseEntity<Void> addTask(@RequestBody Task task) {
        logger.info("Adding new task: {}", task);
        if (task == null) {
            return ResponseEntity.badRequest().build();
        }
        taskService.addTask(task);

        return ResponseEntity.status(201).build();
    }

    @PutMapping(value = "/update", produces = "application/json")
    public ResponseEntity<Void> updateTask(@RequestBody Task task) {
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
