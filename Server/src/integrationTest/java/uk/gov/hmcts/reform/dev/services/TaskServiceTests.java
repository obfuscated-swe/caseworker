package uk.gov.hmcts.reform.dev.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.repositories.TaskRepository;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class TaskServiceTests {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    void setUp() {
        taskRepository.deleteAll();
    }

    @Test
    void shouldCreateAndGetTask() {
        Task task = new Task();
        task.setId(1);
        task.setCaseNumber(1234);
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setStatus(TaskStatus.NotStarted);
        task.setDueDate(LocalDateTime.now().plusDays(1));

        taskService.addTask(task);
        Task retrievedTask = taskService.getTask(1);

        assertThat(retrievedTask).isNotNull();
        assertThat(retrievedTask.getTitle()).isEqualTo("Test Task");
    }

    @Test
    void shouldGetAllTasks() {
        Task task1 = new Task(1, 1234, "Task 1", "Description 1", TaskStatus.NotStarted, LocalDateTime.now());
        Task task2 = new Task(2, 5678, "Task 2", "Description 2", TaskStatus.InProgress, LocalDateTime.now());
        taskService.addTask(task1);
        taskService.addTask(task2);

        List<Task> tasks = taskService.getAllTasks();

        assertThat(tasks).hasSize(2);
        assertThat(tasks).extracting(Task::getTitle).containsExactlyInAnyOrder("Task 1", "Task 2");
    }

    @Test
    void shouldUpdateTask() {
        Task task = new Task(1, 1234, "Original Title", "Description", TaskStatus.NotStarted, LocalDateTime.now());
        taskService.addTask(task);

        task.setTitle("Updated Title");
        taskService.updateTask(task);
        Task updatedTask = taskService.getTask(1);

        assertThat(updatedTask.getTitle()).isEqualTo("Updated Title");
    }

    @Test
    void shouldDeleteTask() {
        Task task = new Task(1, 1234, "Task", "Description", TaskStatus.NotStarted, LocalDateTime.now());
        taskService.addTask(task);

        taskService.deleteTask(1);

        assertThat(taskService.getTask(1)).isNull();
    }
}
