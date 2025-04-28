package uk.gov.hmcts.reform.dev;

import org.junit.jupiter.api.Test;

import org.mockito.Mockito;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.repositories.TaskRepository;
import uk.gov.hmcts.reform.dev.services.TaskService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

class TaskServiceUnitTest {

    private final TaskRepository taskRepository = Mockito.mock(TaskRepository.class);
    private final TaskService taskService = new TaskService(taskRepository);

    @Test
    void testGetTask() {
        int taskId = 1;
        Task mockTask = new Task();
        mockTask.setId(taskId);

        when(taskRepository.findById(taskId)).thenReturn(java.util.Optional.of(mockTask));

        Task task = taskService.getTask(taskId);

        assertNotNull(task, "Task should not be null");
        assertEquals(taskId, task.getId(), "Task ID should match the input ID");
    }

    @Test
    void testCreateTask() {
        Task task = new Task();
        task.setId(1);
        task.setTitle("Test Task");

        when(taskRepository.save(task)).thenReturn(task);

        Task createdTask = taskService.addTask(task);

        assertNotNull(createdTask, "Created task should not be null");
        assertEquals("Test Task", createdTask.getTitle(), "Task title should match");
    }

    @Test
    void testUpdateTask() {
        Task task = new Task();
        task.setId(1);
        task.setTitle("Updated Task");

        when(taskRepository.save(task)).thenReturn(task);

        taskService.updateTask(task);

        Mockito.verify(taskRepository).save(task);
    }

    @Test
    void testDeleteTask() {
        int taskId = 1;

        taskService.deleteTask(taskId);

        Mockito.verify(taskRepository).deleteById(taskId);
    }
}
