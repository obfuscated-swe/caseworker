package uk.gov.hmcts.reform.dev.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;
import uk.gov.hmcts.reform.dev.repositories.TaskRepository;
import uk.gov.hmcts.reform.dev.specifications.TaskSpecifications;

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
        Specification<Task> spec = Specification.where(null);
        Sort sort = Sort.by("dueDate").ascending();
        PageRequest pageable = PageRequest.of(page, size, sort);

        return taskRepository.findAll(spec, pageable);
    }

    public Page<Task> getAllTasks(int page, int size, List<TaskStatus> statuses, Integer caseNumber, String order) {
        Specification<Task> spec = Specification
            .where(TaskSpecifications.withStatusIn(statuses))
            .and(TaskSpecifications.withCaseNumber(caseNumber));

        Sort sort = "ascending".equalsIgnoreCase(order)
            ? Sort.by("dueDate").ascending()
            : Sort.by("dueDate").descending();

        PageRequest pageable = PageRequest.of(page, size, sort);

        return taskRepository.findAll(spec, pageable);
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
