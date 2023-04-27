package seb43_pre_027.demo.question.dto;

import lombok.*;
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class CommentBody {
    private Long CommentId;
    private String CommentBody;
    private String nickName;
}
