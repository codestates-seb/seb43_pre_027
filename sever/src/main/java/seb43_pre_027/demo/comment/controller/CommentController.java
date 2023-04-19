package seb43_pre_027.demo.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb43_pre_027.demo.comment.dto.CommentPatchDto;
import seb43_pre_027.demo.comment.dto.CommentPostDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.mapper.CommentMapper;
import seb43_pre_027.demo.comment.service.CommentService;
import seb43_pre_027.demo.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    private final static String COMMENT_DEFAULT_URL = "/comments";
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PatchMapping("/{comment-id}")  //수정요청
    public ResponseEntity patchComment(
            @PathVariable("comment-id") @Positive long commentId,
            @Valid @RequestBody CommentPatchDto patchDto) {
        Comment comment = commentMapper.commentPatchDtoToComment(patchDto);
        comment.setCommentId(commentId);
        commentService.updateComment(comment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(
            @PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}


