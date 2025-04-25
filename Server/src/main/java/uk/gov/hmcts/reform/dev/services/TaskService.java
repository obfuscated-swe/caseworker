package uk.gov.hmcts.reform.dev.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.repositories.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task getTask(int id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task getTaskByCaseNumber(int caseNumber) {
        return taskRepository.findByCaseNumber(caseNumber).orElse(null);
    }

    public Page<Task> getAllTasks(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return taskRepository.findAll(pageable);
    }

    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    public void updateTask(Task task) {
        taskRepository.save(task);
    }

    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }
}
