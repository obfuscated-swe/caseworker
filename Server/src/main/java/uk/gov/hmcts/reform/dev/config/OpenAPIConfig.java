package uk.gov.hmcts.reform.dev.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .openapi("3.0.1")
            .info(new Info()
                      .title("Task API")
                      .description("Restful API for managing tasks")
                      .version("v0.0.1"));
    }

}
