package seb43_pre_027.demo.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import seb43_pre_027.demo.question.entity.Question;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "제목은 공백이 아니어야 합니다.")
        private String title;

        @NotBlank(message = "질문 내용은 공백이 아니어야 합니다.")
        private String body;

        private long memberId;

        public void addMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long questionId; //특정게시물

        @NotBlank(message = "제목은 공백이 아니어야 합니다.")
        private String title;

        @NotBlank(message = "질문 내용은 공백이 아니어야 합니다.")
        private String body;

        public void setQuestionId(long questionId) {
            this.questionId = questionId;
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response { //ㅇ/ㅐ가 포스트맨에 보여지는 값
        private long questionId;
        private String title;
        private String body;
        private String memberNickName; //작성자아이디
        private Question.QuestionStatus questionStatus;

        //작성자 닉네임

    }

    @Getter
    @Setter
    public static class QuestionWithCommentResponseDto {
        private String title;
        private String nickName;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String body;
        private List<CommentBody> commentBodys;
    }
}
