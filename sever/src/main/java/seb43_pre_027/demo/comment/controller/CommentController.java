package seb43_pre_027.demo.comment.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seb43_pre_027.demo.comment.dto.CommentDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.mapper.CommentMapper;
import seb43_pre_027.demo.comment.service.CommentService;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.question.entity.Question;
import seb43_pre_027.demo.question.service.QuestionService;
import seb43_pre_027.demo.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

import static seb43_pre_027.demo.question.controller.QuestionController.QUESTION_DEFAULT_URL;

@RestController
@RequestMapping("/comments")
@Slf4j
public class CommentController {
    QuestionService questionService;
    MemberService memberService;
    CommentService commentService;
    CommentMapper commentMapper;

    public CommentController(QuestionService questionService, MemberService memberService, CommentService commentService, CommentMapper commentMapper) {
        this.questionService = questionService;
        this.memberService = memberService;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }
    @GetMapping("/create")
    public ResponseEntity createMock(){
        commentService.createMock();
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/{member-id}/{question-id}")
    public ResponseEntity postCommentOfQuestion(@PathVariable("question-id") long questionId,
                                                @PathVariable("member-id") long memberId,
                                                @Valid @RequestBody CommentDto.Post requestBody) {
        Question verifiedQuestion = questionService.findVerifiedQuestion(questionId);

        Member verifiedMember = memberService.findVerifiedMember(memberId);
        Comment comment = commentMapper.commentPostDtoToComment(requestBody,verifiedMember,verifiedQuestion);


        Comment createdComment = commentService.createComment(comment);

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdComment.getCommentId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}/{comment-id}")
    public ResponseEntity patchComment(
            @PathVariable("comment-id") @Positive long commentId,
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody CommentDto.Patch patchDto) {
        Comment comment = commentMapper.commentPatchDtoToComment(patchDto);
        comment.setCommentId(commentId);
        commentService.updateComment(comment,memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    //두개다 멤버로 병합
    @DeleteMapping("/{member-id}/{comment-id}")
    public ResponseEntity deleteComment(
            @PathVariable("comment-id") @Positive long commentId,
            @PathVariable("member-id") @Positive long memberId) {
        commentService.deleteComment(commentId,memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
