package seb43_pre_027.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class StackOverflowCloneCodingApplication {

	public static void main(String[] args) {
		SpringApplication.run(StackOverflowCloneCodingApplication.class, args);
	}

}
