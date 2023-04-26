package seb43_pre_027.demo.question.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb43_pre_027.demo.comment.dto.CommentDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.mapper.CommentMapper;
import seb43_pre_027.demo.comment.service.CommentService;
import seb43_pre_027.demo.dto.MultiResponseDto;
import seb43_pre_027.demo.dto.MultiResponseDto2;
import seb43_pre_027.demo.dto.PageInfo;
import seb43_pre_027.demo.dto.TotalCount;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.question.dto.QuestionDto;
import seb43_pre_027.demo.question.entity.Question;
import seb43_pre_027.demo.question.mapper.QuestionMapper;
import seb43_pre_027.demo.question.service.QuestionService;
import seb43_pre_027.demo.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/questions")
@Validated
@Slf4j
public class QuestionController {
    public final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final MemberService memberService;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, MemberService memberService) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.memberService = memberService;
    }
    @GetMapping("/create")
    public ResponseEntity createQuestion(){
        questionService.testMockCreate();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(
            @PathVariable("question-id") @Positive long questionId) {
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(questionMapper.questionToQuestionWithCommentResponseDto(question), HttpStatus.OK);
    }

    @GetMapping("/all-questions")
    public ResponseEntity getQuestions() {
        List<Question> questionList = questionService.findQuestionList();
        return new ResponseEntity<>(
                new MultiResponseDto2<>(questionMapper.questionsToQuestionResponseDtos(questionList),
                        new TotalCount(questionList.size())),
                HttpStatus.OK);
    }

    @PostMapping(value = "/{member-id}",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity postQuestionOfMember(@Positive @PathVariable("member-id") long memberId,
                                               @Valid @RequestBody QuestionDto.Post requestBody) {
        requestBody.addMemberId(memberId);
        Question question = questionMapper.questionPostDtoToQuestion(requestBody);
        Member verifiedMember = memberService.findVerifiedMember(memberId);
        question.setMember(verifiedMember);
        Question createdQuestion =
                questionService.createQuestion(question);
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdQuestion.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}/{question-id}")
    public ResponseEntity patchQuestionOfMember(
            @PathVariable("question-id") @Positive long questionId,
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody QuestionDto.Patch requestBody) {
        requestBody.setQuestionId(questionId);

        Question question =
                questionService.updateQuestion(questionMapper.questionPatchDtoToQuestion(requestBody),memberId);

        return new ResponseEntity<>(questionMapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }
    @DeleteMapping("/{member-id}/{question-id}")
    public ResponseEntity deleteQuestion(
            @PathVariable("question-id") @Positive long questionId,
            @PathVariable("member-id") @Positive long memberId) {
        questionService.deleteQuestion(questionId,memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
