package uk.gov.hmcts.reform.dev.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import uk.gov.hmcts.reform.dev.TaskTestConfig;
import uk.gov.hmcts.reform.dev.services.TaskService;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = TaskController.class)
@Import(TaskTestConfig.class)
class TaskControllerTests {

    @Autowired
    private transient MockMvc mockMvc;

    @Autowired
    private TaskService taskService;

    @DisplayName("Should welcome upon root request with 200 response code")
    @Test
    void shouldReturnListFromAllEndpoint() throws Exception {
        when(taskService.getAllTasks()).thenReturn(Collections.emptyList());

        MvcResult response = mockMvc.perform(get("/api/tasks/all"))
                .andExpect(status().isOk())
                .andReturn();
        String content = response.getResponse().getContentAsString();

        assertThat(content).isNotNull();
    }
}
