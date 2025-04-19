package uk.gov.hmcts.reform.dev.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {
    @Id
    private int id;
    private int caseNumber;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 16)
    private TaskStatus status;
    private LocalDateTime dueDate;
}
