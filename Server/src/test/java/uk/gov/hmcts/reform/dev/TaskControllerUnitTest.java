package uk.gov.hmcts.reform.dev;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import uk.gov.hmcts.reform.dev.controllers.TaskController;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.services.TaskService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class TaskControllerUnitTest {

    private MockMvc mockMvc;

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    /**
     * Helper method to create a default Task object for testing.
     * @return a Task object with sample data
     */
    private Task createTask() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setCaseNumber(1111);
        task.setDescription("Test Description");
        task.setStatus(TaskStatus.NotStarted);
        task.setDueDate(LocalDateTime.now());
        return task;
    }

    @Test
    void testGetTask() throws Exception {
        Task task = createTask();
        task.setId(1);

        when(taskService.getTask(1)).thenReturn(task);

        mockMvc.perform(get("/api/tasks/?id=1")
                            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id", is(1)))
            .andExpect(jsonPath("$.title", is("Test Task")));
    }

    @Test
    void testGetTaskNotFound() throws Exception {
        when(taskService.getTask(999)).thenReturn(null);

        mockMvc.perform(get("/api/tasks/?id=999")
                            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllTasks() throws Exception {
        Task task1 = createTask();
        task1.setId(1);
        task1.setTitle("Task 1");

        Task task2 = createTask();
        task2.setId(2);
        task2.setTitle("Task 2");

        List<Task> tasks = Arrays.asList(task1, task2);

        PageRequest pageable = PageRequest.of(0, 20);
        Page<Task> taskPage = new PageImpl<>(tasks, pageable, tasks.size());

        when(taskService.getAllTasks(0, 20, null, null, "ascending")).thenReturn(taskPage);

        mockMvc.perform(get("/api/tasks/all")
                            .contentType(MediaType.APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content", hasSize(2)));
    }

    @Test
    void testGetTaskById() throws Exception {
        Task task = createTask();
        task.setId(1);

        when(taskService.getTask(1)).thenReturn(task);

        mockMvc.perform(get("/api/tasks/?id=1")
                            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id", is(1)))
            .andExpect(jsonPath("$.title", is("Test Task")));
    }
}
