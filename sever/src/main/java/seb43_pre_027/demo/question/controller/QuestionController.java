package seb43_pre_027.demo.question.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb43_pre_027.demo.comment.dto.CommentDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.mapper.CommentMapper;
import seb43_pre_027.demo.comment.service.CommentService;
import seb43_pre_027.demo.dto.MultiResponseDto;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.question.entity.Question;
import seb43_pre_027.demo.question.mapper.QuestionMapper;
import seb43_pre_027.demo.question.service.QuestionService;
import seb43_pre_027.demo.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Validated
@Slf4j
public class QuestionController {
    public final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final MemberService memberService;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, CommentService commentService, CommentMapper commentMapper, MemberService memberService) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.memberService = memberService;
    }


    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(
            @PathVariable("question-id") @Positive long questionId) {
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(questionMapper.questionToQuestionWithCommentResponseDto(question), HttpStatus.OK);
    }

    @GetMapping("/all-questions")
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(questionMapper.questionsToQuestionResponseDtos(questions), pageQuestions),
                HttpStatus.OK);
    }


    @PostMapping("/{member-id}/{question-id}/comments")
    public ResponseEntity postCommentOfQuestion(@PathVariable("question-id") long questionId,
                                                @PathVariable("member-id") long memberId,
                                                @Valid @RequestBody CommentDto.Post requestBody) {
        Question verifiedQuestion = questionService.findVerifiedQuestion(questionId);
        Member verifiedMember = memberService.findVerifiedMember(memberId);
        Comment comment = commentMapper.commentPostDtoToComment(requestBody,verifiedMember,verifiedQuestion);
        log.info("comment!!============================= {}", comment.getCommentId());
        log.info("comment!!============================= {}", comment.getCommentStatus());
        log.info("comment!!============================= {}", comment.getQuestion());
        log.info("comment!!============================= {}", comment.getBody());
        log.info("comment!!============================= {}", comment.getMember());
        log.info("comment!!============================= {}", comment.getLikeCount());


        Comment createdComment = commentService.createComment(comment);

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdComment.getCommentId());

        return ResponseEntity.created(location).build();
    }
}
