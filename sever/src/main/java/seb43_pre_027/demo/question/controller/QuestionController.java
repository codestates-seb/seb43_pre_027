package seb43_pre_027.demo.question.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb43_pre_027.demo.comment.dto.CommentPostDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.mapper.CommentMapper;
import seb43_pre_027.demo.comment.service.CommentService;
import seb43_pre_027.demo.dto.MultiResponseDto;
import seb43_pre_027.demo.question.dto.QuestionDto;
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

    public QuestionController(QuestionService questionService,
                              QuestionMapper questionMapper,
                              CommentService commentService,
                              CommentMapper commentMapper) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(
            @PathVariable("question-id") @Positive long questionId,
            @Valid @RequestBody QuestionDto.Patch requestBody) {
        requestBody.setQuestionId(questionId);

        Question question =
                questionService.updateQuestion(questionMapper.questionPatchDtoToQuestion(requestBody));

        return new ResponseEntity<>(questionMapper.questionToQuestionResponseDto(question), HttpStatus.OK);
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

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(
            @PathVariable("question-id") @Positive long questionId) {
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{question-id}/comments")
    public ResponseEntity postCommentOfQuestion(@PathVariable("question-id") long questionId,
                                                @Valid @RequestBody CommentPostDto requestBody) {
        requestBody.addQuestionId(questionId);
        requestBody.addMemberId(questionService.findQuestion(questionId).getMember().getMemberId());

        Comment createdComment = commentService.createComment(commentMapper.commentPostDtoToComment(requestBody));
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdComment.getCommentId());

        return ResponseEntity.created(location).build();
    }
}
