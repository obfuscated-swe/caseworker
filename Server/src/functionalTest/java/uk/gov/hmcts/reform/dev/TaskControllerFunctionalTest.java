package uk.gov.hmcts.reform.dev;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import uk.gov.hmcts.reform.dev.enums.TaskStatus;
import uk.gov.hmcts.reform.dev.models.Task;

import java.time.LocalDateTime;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
class TaskControllerFunctionalTest {
    protected static final String CONTENT_TYPE_VALUE = "application/json";

    @Value("${TEST_URL:http://localhost:4000}")
    private String testUrl;

    private Task createTask(int caseNumber) {
        Task task = new Task();
        task.setCaseNumber(caseNumber);
        task.setTitle("Example title");
        task.setDescription("Example description");
        task.setStatus(TaskStatus.NotStarted);
        task.setDueDate(LocalDateTime.now());
        return task;
    }

    @BeforeEach
    public void setUp() {
        RestAssured.baseURI = testUrl;
        RestAssured.useRelaxedHTTPSValidation();
    }

    @Test
    void shouldConfirmApplicationIsHealthy() {
        Response response = given()
            .contentType(ContentType.JSON)
            .when()
            .get("/health")
            .then()
            .extract()
            .response();

        String errorMessage = "Application health check failed. Status: %d, Response: %s\n"
            + "Check if:\n"
            + "1. Application is running\n"
            + "2. Database container is up\n";

        assertThat(response.getStatusCode())
            .withFailMessage(errorMessage,
                             response.getStatusCode(),
                             response.getBody().asString())
            .isEqualTo(200);

        assertThat(response.jsonPath().getString("components.db.status"))
            .withFailMessage("Database is not UP. Health status: %s",
                             response.jsonPath().getString("components.db.status"))
            .isEqualTo("UP");
    }

    @Test
    void shouldGetAllTasks() {
        Response response = given()
            .contentType(ContentType.JSON)
            .when()
            .get("/api/tasks/all")
            .then()
            .extract()
            .response();

        assertThat(response.getStatusCode())
            .withFailMessage("Could not get a correct response: %s", response.getStatusCode())
            .isEqualTo(200);
    }

    @Test
    void shouldPostTask() {
        Task task = createTask(1234);


        Response response = given()
            .contentType(ContentType.JSON)
            .body(task)
            .when()
            .post("/api/tasks/add")
            .then()
            .extract()
            .response();

        assertThat(response.getStatusCode())
            .withFailMessage("Could not post a task: %s", response.getStatusCode())
            .isEqualTo(201);
    }

    @Test
    void shouldGetTask() {
        Task task = createTask(1234);

        Response postResponse = given()
            .contentType(ContentType.JSON)
            .body(task)
            .when()
            .post("/api/tasks/add")
            .then()
            .extract()
            .response();

        int taskId = postResponse.jsonPath().getInt("id");

        Response getResponse = given()
            .contentType(ContentType.JSON)
            .when()
            .get("/api/tasks/?id=" + taskId)
            .then()
            .extract()
            .response();

        assertThat(getResponse.getStatusCode())
            .withFailMessage("Could not get the task: %s", getResponse.getStatusCode())
            .isEqualTo(200);
    }

    @Test
    void shouldUpdateTask() {
        Task task = createTask(1234);

        Response postResponse = given()
            .contentType(ContentType.JSON)
            .body(task)
            .when()
            .post("/api/tasks/add")
            .then()
            .extract()
            .response();

        int taskId = postResponse.jsonPath().getInt("id");

        task.setId(taskId);
        task.setTitle("Updated Title");

        Response updateResponse = given()
            .contentType(ContentType.JSON)
            .body(task)
            .when()
            .put("/api/tasks/update")
            .then()
            .extract()
            .response();

        assertThat(updateResponse.getStatusCode())
            .withFailMessage("Could not update the task: %s", updateResponse.getStatusCode())
            .isEqualTo(200);
    }

    @Test
    void shouldDeleteTask() {
        Task task = createTask(1111);

        Response postResponse = given()
            .contentType(ContentType.JSON)
            .body(task)
            .when()
            .post("/api/tasks/add")
            .then()
            .extract()
            .response();

        int taskId = postResponse.jsonPath().getInt("id");

        Response deleteResponse = given()
            .contentType(ContentType.JSON)
            .when()
            .delete("/api/tasks/delete/?id=" + taskId)
            .then()
            .extract()
            .response();

        assertThat(deleteResponse.getStatusCode())
            .withFailMessage("Could not delete the task: %s", deleteResponse.getStatusCode())
            .isEqualTo(204);
    }
}
