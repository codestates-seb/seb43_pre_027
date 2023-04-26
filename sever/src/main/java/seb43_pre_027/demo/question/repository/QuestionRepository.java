package seb43_pre_027.demo.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb43_pre_027.demo.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
