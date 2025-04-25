package uk.gov.hmcts.reform.dev.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.repositories.TaskRepository;

import java.time.LocalDateTime;

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

    Task createTask(int caseNumber, String title, String description, TaskStatus status, LocalDateTime dueDate) {
        Task task = new Task();
        task.setCaseNumber(caseNumber);
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus(status);
        task.setDueDate(dueDate);
        return task;
    }

    @Test
    void shouldCreateAndGetTask() {
        Task task = createTask(1234,
                               "Test Task",
                               "This is a test task",
                               TaskStatus.NotStarted,
                               LocalDateTime.now());

        int taskId = taskService.addTask(task).getId();
        Task retrievedTask = taskService.getTask(taskId);

        assertThat(retrievedTask).isNotNull();
        assertThat(retrievedTask.getTitle()).isEqualTo("Test Task");
    }

    @Test
    void shouldGetAllTasks() {
        Task task1 = createTask(1234,
                               "Task 1",
                               "This is a test task",
                               TaskStatus.NotStarted,
                               LocalDateTime.now());

        Task task2 = createTask(5678,
                                "Task 2",
                                "This is another test task description",
                                TaskStatus.InProgress,
                                LocalDateTime.now());

        taskService.addTask(task1);
        taskService.addTask(task2);

        Page<Task> tasks = taskService.getAllTasks(0, 10);

        assertThat(tasks).hasSize(2);
        assertThat(tasks).extracting(Task::getTitle).containsExactlyInAnyOrder("Task 1", "Task 2");
    }

    @Test
    void shouldUpdateTask() {
        Task task = createTask(2345,
                               "Test Task Three",
                               "This is a test task",
                               TaskStatus.NotStarted,
                               LocalDateTime.now());



        int taskId = taskService.addTask(task).getId();

        task.setTitle("Updated Title");

        taskService.updateTask(task);

        System.out.println(task.getId() + " " + task.getTitle());

        Task updatedTask = taskService.getTask(taskId);

        assertThat(updatedTask).isNotNull();

        assertThat(updatedTask.getTitle()).isEqualTo("Updated Title");
    }

    @Test
    void shouldDeleteTask() {
        Task task = createTask(2345,
                               "Test Task Three",
                               "This is a test task",
                               TaskStatus.NotStarted,
                               LocalDateTime.now());

        int taskId = taskService.addTask(task).getId();

        taskService.deleteTask(taskId);

        assertThat(taskService.getTask(taskId)).isNull();
    }
}
