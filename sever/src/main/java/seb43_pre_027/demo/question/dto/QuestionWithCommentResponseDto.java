package seb43_pre_027.demo.question.dto;

import lombok.Getter;
import lombok.Setter;
import seb43_pre_027.demo.comment.entity.Comment;

import java.util.List;
@Getter
@Setter
public class QuestionWithCommentResponseDto {
    private String title;

    private String body;

    private List<String> commentBodys;
}
