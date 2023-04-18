package seb43_pre_027.demo.question.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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
    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping  //질문 게시글 생성, 생성하는 메서드를 만들 수 있지만 그래서 서비스 해주는 클래스를 만듦 , 질문객체
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post questionPostDto) {
        Question question = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto));
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(
            @PathVariable("question-id") @Positive long questionId,
            @Valid @RequestBody QuestionDto.Patch requestBody) {
        requestBody.setQuestionId(questionId);

        Question question =
                questionService.updateQuestion(mapper.questionPatchDtoToQuestion(requestBody));

        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(
            @PathVariable("question-id") @Positive long questionId) {
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    @GetMapping("/all-questions")
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.questionsToQuestionResponseDtos(questions), pageQuestions),
                HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(
            @PathVariable("question-id") @Positive long questionId) {
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
