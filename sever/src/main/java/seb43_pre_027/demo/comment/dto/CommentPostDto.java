package seb43_pre_027.demo.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentPostDto {
    private long questionId;
    private long memberId;
    private String body;

    public void addQuestionId(long questionId) {
        this.questionId = questionId;
    }

    public void addMemberId(long memberId) {
        this.memberId = memberId;
    }
}
