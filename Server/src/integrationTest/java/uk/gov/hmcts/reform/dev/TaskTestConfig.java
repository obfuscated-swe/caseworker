package uk.gov.hmcts.reform.dev;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import uk.gov.hmcts.reform.dev.services.TaskService;

import static org.mockito.Mockito.mock;

@TestConfiguration
public class TaskTestConfig {
    @Bean
    public TaskService taskService() {
        return mock(TaskService.class);
    }
}
