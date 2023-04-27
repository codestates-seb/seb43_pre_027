package seb43_pre_027.demo.question.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb43_pre_027.demo.dto.MultiResponseDto2;
import seb43_pre_027.demo.dto.TotalCount;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.question.dto.QuestionDto;
import seb43_pre_027.demo.question.entity.Question;
import seb43_pre_027.demo.question.mapper.QuestionMapper;
import seb43_pre_027.demo.question.service.QuestionService;
import seb43_pre_027.demo.security.auth.jwt.JwtTokenizer;
import seb43_pre_027.demo.utils.UriCreator;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/questions")
@Validated
@Slf4j
public class QuestionController {
    public final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, MemberService memberService, JwtTokenizer jwtTokenizer) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @GetMapping("/create")
    public ResponseEntity createQuestion() {
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

    @PostMapping
    public ResponseEntity postQuestionOfMember(HttpServletRequest request,
                                               @Valid @RequestBody QuestionDto.Post requestBody) {
        Long memberId = getMemberId(request);

        requestBody.addMemberId(memberId);
        Member findMember = memberService.findVerifiedMember(memberId);
        Question question = questionMapper.questionPostDtoToQuestion(requestBody);
        question.setMember(findMember);
        Question createdQuestion =
                questionService.createQuestion(question, memberId);
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdQuestion.getQuestionId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestionOfMember(
            @PathVariable("question-id") @Positive long questionId,
            HttpServletRequest request,
            @Valid @RequestBody QuestionDto.Patch requestBody) {
        requestBody.setQuestionId(questionId);
        Long memberId = getMemberId(request);
        Question question =
                questionService.updateQuestion(questionMapper.questionPatchDtoToQuestion(requestBody),memberId);

        return new ResponseEntity<>(questionMapper.questionToQuestionResponseDto(question), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(
            @PathVariable("question-id") @Positive long questionId,
            HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        String username = (String) claims.get("username");
        Member verifiedEmail = memberService.findVerifiedEmail(username);
        Long memberId = verifiedEmail.getMemberId();
        questionService.deleteQuestion(questionId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    private Long getMemberId(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        String username = (String) claims.get("username");
        Member verifiedEmail = memberService.findVerifiedEmail(username);
        Long memberId = verifiedEmail.getMemberId();
        return memberId;
    }
}
