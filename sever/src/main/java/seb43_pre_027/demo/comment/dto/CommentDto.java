package seb43_pre_027.demo.comment.dto;

import lombok.Getter;
import lombok.Setter;

public class CommentDto {
    @Getter
    @Setter
    public static class Patch {
        private String body;
    }

    @Getter
    @Setter
    public static class Post {
        private String body;
    }
}
