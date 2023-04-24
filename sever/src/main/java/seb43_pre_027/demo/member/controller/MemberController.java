package seb43_pre_027.demo.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import seb43_pre_027.demo.auth.dto.LoginDto;
import seb43_pre_027.demo.comment.dto.CommentPatchDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.mapper.CommentMapper;
import seb43_pre_027.demo.comment.service.CommentService;
import seb43_pre_027.demo.member.dto.MemberPatchDto;
import seb43_pre_027.demo.member.dto.MyQuestionResponseDto;
import seb43_pre_027.demo.member.mapper.MemberMapper;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.member.dto.MemberPostDto;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.question.dto.QuestionDto;
import seb43_pre_027.demo.question.entity.Question;
import seb43_pre_027.demo.question.mapper.QuestionMapper;
import seb43_pre_027.demo.question.service.QuestionService;
import seb43_pre_027.demo.utils.UriCreator;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.List;

import static seb43_pre_027.demo.question.controller.QuestionController.QUESTION_DEFAULT_URL;

@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public MemberController(MemberService memberService,
                            MemberMapper memberMapper,
                            QuestionService questionService,
                            QuestionMapper questionMapper,
                            CommentService commentService,
                            CommentMapper commentMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId,HttpServletRequest request) throws IOException {
        Member verifiedMember = memberService.findVerifiedMember(memberId);
        return new ResponseEntity(verifiedMember,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity SignUp(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createMember(member);

        URI location = UriCreator.createUri("/members", createdMember.getMemberId());
        return ResponseEntity.created(location).build();
    }


    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive long memberId,
                                       @RequestBody MemberPatchDto memberPatchDto) {
        Member member = memberMapper.memberPatchDtoToMember(memberPatchDto);
        member.setMemberId(memberId);
        memberService.updateMember(member);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id")
                                       @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/my-question/{member-id}")
    public ResponseEntity getMyQuestion(@PathVariable("member-id") long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        List<MyQuestionResponseDto> myQuestionResponseDtos = memberMapper.memberToMyQuestionResponseDtos(member);
        return new ResponseEntity(myQuestionResponseDtos, HttpStatus.OK);
    }

    //구현해야함
    @GetMapping("my-comment/{member-id}")
    public ResponseEntity getMyComment(@PathVariable("member-id") long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        List<Comment> comments = member.getComments();

        return new ResponseEntity(comments, HttpStatus.OK);
    }

    @PostMapping(value = "/{member-id}/questions",
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

    @PatchMapping("/{member-id}/{comment-id}")  //수정요청멤버에 병합시킬껀지(멤버확인하고 수정가능하게 변경해야함)
    public ResponseEntity patchComment(
            @PathVariable("comment-id") @Positive long commentId,
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody CommentPatchDto patchDto) {
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
