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
import seb43_pre_027.demo.security.auth.jwt.JwtTokenizer;
import seb43_pre_027.demo.utils.UriCreator;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.Map;

import static seb43_pre_027.demo.question.controller.QuestionController.QUESTION_DEFAULT_URL;

@RestController
@RequestMapping("/comments")
@Slf4j
public class CommentController {
    private final QuestionService questionService;
    private final MemberService memberService;
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final JwtTokenizer jwtTokenizer;

    public CommentController(QuestionService questionService,
                             MemberService memberService,
                             CommentService commentService,
                             CommentMapper commentMapper,
                             JwtTokenizer jwtTokenizer) {
        this.questionService = questionService;
        this.memberService = memberService;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.jwtTokenizer = jwtTokenizer;
    }

    @GetMapping("/create")
    public ResponseEntity createMock(){
        commentService.createMock();
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postCommentOfQuestion(@PathVariable("question-id") long questionId,
                                                HttpServletRequest request,
                                                @Valid @RequestBody CommentDto.Post requestBody) {

        Long memberId = getMemberId(request);

        Question verifiedQuestion = questionService.findVerifiedQuestion(questionId);
        Member verifiedMember = memberService.findVerifiedMember(memberId);

        Comment comment = commentMapper.commentPostDtoToComment(requestBody,verifiedMember,verifiedQuestion);
        Comment createdComment = commentService.createComment(comment);

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, createdComment.getCommentId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(
            @PathVariable("comment-id") @Positive long commentId,
            HttpServletRequest request,
            @Valid @RequestBody CommentDto.Patch patchDto) {
        Long memberId = getMemberId(request);

        Comment comment = commentMapper.commentPatchDtoToComment(patchDto);
        comment.setCommentId(commentId);
        commentService.updateComment(comment,memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    //두개다 멤버로 병합
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(
            @PathVariable("comment-id") @Positive long commentId,
            HttpServletRequest request) {
        Long memberId = getMemberId(request);

        commentService.deleteComment(commentId,memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PostMapping("/adopt/{comment-id}")
    public ResponseEntity adoptComment(
            HttpServletRequest request,
            @PathVariable("comment-id") long commentId) {
        Long memberId = getMemberId(request);
        commentService.adoptComment(memberId, commentId);
        return new ResponseEntity<>(HttpStatus.OK);
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
