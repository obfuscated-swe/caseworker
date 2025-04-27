package uk.gov.hmcts.reform.dev;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class TaskControllerFunctionalTest {
    protected static final String CONTENT_TYPE_VALUE = "application/json";

    @Value("${TEST_URL:http://localhost:4000}")
    private String testUrl;

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
}
