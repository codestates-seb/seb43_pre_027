package seb43_pre_027.demo.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MemberDto {
    @Getter
    @Setter
    public static class Patch {
        private String nickName;
        private String location;
    }

    @Getter
    @Setter
    public static class Post {
        private String nickName;

        private String email;

        private String password;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class MyQuestionResponseDto {
        private Long questionId;
        private String title;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class MyCommentResponseDto {
        private Long questionId;
        private String questionTitle;
        private Long commentId;
        private String commentBody;


    }
}
