package seb43_pre_027.demo.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import seb43_pre_027.demo.member.dto.MemberDto;
import seb43_pre_027.demo.member.mapper.MemberMapper;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.security.auth.jwt.JwtTokenizer;
import seb43_pre_027.demo.utils.UriCreator;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final JwtTokenizer jwtTokenizer;

    public MemberController(MemberService memberService,
                            MemberMapper memberMapper,
                            JwtTokenizer jwtTokenizer) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.jwtTokenizer = jwtTokenizer;
    }

    @GetMapping
    public ResponseEntity getMember(HttpServletRequest request) throws IOException {
        Long memberId = getMemberId(request);
        Member verifiedMember = memberService.findVerifiedMember(memberId);
        return new ResponseEntity(verifiedMember,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity SignUp(@Valid @RequestBody MemberDto.Post memberPostDto) {
        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createMember(member);

        URI location = UriCreator.createUri("/members", createdMember.getMemberId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity updateMember(HttpServletRequest request,
                                       @RequestBody MemberDto.Patch memberPatchDto) {
        Long memberId = getMemberId(request);

        Member member = memberMapper.memberPatchDtoToMember(memberPatchDto);
        member.setMemberId(memberId);
        memberService.updateMember(member);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember(HttpServletRequest request) {
        Long memberId = getMemberId(request);
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/my-question")
    public ResponseEntity getMyQuestion(HttpServletRequest request) {
        Long memberId = getMemberId(request);

        Member member = memberService.findVerifiedMember(memberId);
        List<MemberDto.MyQuestionResponseDto> myQuestionResponseDtos = memberMapper.memberToMyQuestionResponseDtos(member);
        return new ResponseEntity(myQuestionResponseDtos, HttpStatus.OK);
    }

    @GetMapping("my-comment")
    public ResponseEntity getMyComment(HttpServletRequest request) {
        Long memberId = getMemberId(request);
        Member member = memberService.findVerifiedMember(memberId);
        List<MemberDto.MyCommentResponseDto> myCommentResponseDtos = memberMapper.memberToMyCommentResponseDtos(member);
        return new ResponseEntity(myCommentResponseDtos, HttpStatus.OK);
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
