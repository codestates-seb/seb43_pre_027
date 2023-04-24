package seb43_pre_027.demo.question.dto;

import lombok.*;
import seb43_pre_027.demo.comment.entity.Comment;
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class CommentBody {
    private String CommentBody;

    private String nickName;
}
