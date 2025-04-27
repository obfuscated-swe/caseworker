package uk.gov.hmcts.reform.dev.specifications;

import org.springframework.data.jpa.domain.Specification;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;

import java.util.List;

public class TaskSpecifications {

    public static Specification<Task> withCaseNumber(Integer caseNumber) {
        return (root, query, criteriaBuilder) -> {
            if (caseNumber == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("caseNumber"), caseNumber);
        };
    }

    public static Specification<Task> withStatusIn(List<TaskStatus> statuses) {
        return (root, query, criteriaBuilder) -> {
            if (statuses == null || statuses.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return root.get("status").in(statuses);
        };
    }
}