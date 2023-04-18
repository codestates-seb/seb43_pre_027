package seb43_pre_027.demo.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb43_pre_027.demo.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
