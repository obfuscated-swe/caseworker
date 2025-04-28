package uk.gov.hmcts.reform.dev.models;

import jakarta.validation.constraints.Min;
import org.springframework.lang.Nullable;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Min(0)
    private int caseNumber;

    @Size(min = 0, max = 128)
    private String title;

    @Size(min = 0, max = 500)
    @Column(nullable = true)
    @Nullable
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 16)
    private TaskStatus status;
    private LocalDateTime dueDate;
}
