package seb43_pre_027.demo.question.dto;

import lombok.Getter;
import lombok.Setter;
import seb43_pre_027.demo.comment.entity.Comment;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
@Getter
@Setter
public class QuestionWithCommentResponseDto {
    private String title;
    private String nickName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private String body;

    private List<CommentBody> commentBodys;
}
