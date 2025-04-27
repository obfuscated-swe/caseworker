package uk.gov.hmcts.reform.dev.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import uk.gov.hmcts.reform.dev.models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task> {
    @NonNull
    Page<Task> findAll(@NonNull Pageable pageable);

    Optional<Task> findByCaseNumber(int caseNumber);
}
