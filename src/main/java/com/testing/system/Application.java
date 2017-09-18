package com.testing.system;

import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		Flyway flyway = new Flyway();
		flyway.setDataSource("jdbc:h2:~/testdb1", "postgres", null);

		flyway.migrate();
		SpringApplication.run(Application.class, args);
	}
}
