package seb43_pre_027.demo.member.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb43_pre_027.demo.auth.utils.CustomAuthorityUtils;
import seb43_pre_027.demo.exception.BusinessLogicException;
import seb43_pre_027.demo.exception.ExceptionCode;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
// OAuth2 사용 시 에러 때문에 잠깐 주석 처리 했습니다.
//        String encryptedPassword = passwordEncoder.encode(member.getPassword());
//        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member){
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getNickName())
                .ifPresent(nickName -> findMember.setNickName(nickName));
        Optional.ofNullable(member.getLocation())
                .ifPresent(location -> findMember.setLocation(location));
        return memberRepository.save(findMember);
    }

    public void deleteMember(Long memberId) {
        Member verifiedMember = findVerifiedMember(memberId);
        verifiedMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(verifiedMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
