package seb43_pre_027.demo.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import seb43_pre_027.demo.question.entity.Question;

import javax.validation.constraints.NotBlank;

public class QuestionDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "제목은 공백이 아니어야 합니다.")
        private String title;

        @NotBlank(message = "질문 내용은 공백이 아니어야 합니다.")
        private String body;
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
        private int likeCount;
        private Question.QuestionStatus questionStatus;

    }
}
