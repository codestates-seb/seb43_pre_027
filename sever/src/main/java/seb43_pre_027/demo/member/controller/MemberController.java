package seb43_pre_027.demo.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import seb43_pre_027.demo.member.dto.MemberDto;
import seb43_pre_027.demo.member.mapper.MemberMapper;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.member.entity.Member;

import seb43_pre_027.demo.utils.UriCreator;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.List;

import static seb43_pre_027.demo.question.controller.QuestionController.QUESTION_DEFAULT_URL;
//memberid pathvariable로 들어가는 부분 jwt에서 claims에 memberid저장된거 꺼내서 memberid로 사용
@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;


    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId,HttpServletRequest request) throws IOException {
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


    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive long memberId,
                                       @RequestBody MemberDto.Patch memberPatchDto) {
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
        List<MemberDto.MyQuestionResponseDto> myQuestionResponseDtos = memberMapper.memberToMyQuestionResponseDtos(member);
        return new ResponseEntity(myQuestionResponseDtos, HttpStatus.OK);
    }


    //구현해야함
    @GetMapping("my-comment/{member-id}")
    public ResponseEntity getMyComment(@PathVariable("member-id") long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        List<MemberDto.MyCommentResponseDto> myCommentResponseDtos = memberMapper.memberToMyCommentResponseDtos(member);
        return new ResponseEntity(myCommentResponseDtos, HttpStatus.OK);
    }

}
