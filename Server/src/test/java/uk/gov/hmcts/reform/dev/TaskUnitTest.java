package uk.gov.hmcts.reform.dev;

import org.junit.jupiter.api.Test;

import uk.gov.hmcts.reform.dev.models.Task;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TaskUnitTest {

    @Test
    void testNoArgsConstructorAndSetters() {
        Task task = new Task();
        task.setId(1);
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setStatus("pending");
        LocalDateTime dueDate = LocalDateTime.now();
        task.setDueDate(dueDate);

        assertEquals(1, task.getId());
        assertEquals("Test Task", task.getTitle());
        assertEquals("Test Description", task.getDescription());
        assertEquals("pending", task.getStatus());
        assertEquals(dueDate, task.getDueDate());
    }
}
