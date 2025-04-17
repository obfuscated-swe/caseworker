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

        // Mock the behavior of the repository
        when(taskRepository.findById(taskId)).thenReturn(java.util.Optional.of(mockTask));

        Task task = taskService.getTask(taskId);

        assertNotNull(task, "Task should not be null");
        assertEquals(taskId, task.getId(), "Task ID should match the input ID");
    }
}
