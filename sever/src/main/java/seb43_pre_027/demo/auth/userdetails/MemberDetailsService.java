package seb43_pre_027.demo.auth.userdetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import seb43_pre_027.demo.auth.utils.CustomAuthorityUtils;
import seb43_pre_027.demo.exception.BusinessLogicException;
import seb43_pre_027.demo.exception.ExceptionCode;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.repository.MemberRepository;

import java.util.Collection;
import java.util.Optional;
/*
Spring Security에서 제공하는 컴포넌트 중 하나인 UserDetailsService는 User의 정보를 로드하는 핵심 인터페이스임
여기서는 memberRepository에서 데이터를 로드하고 있음


 */
@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository; //데이터베이스에서 User를 조회하고 조회한 User의 권한(Role) 정보를 생성하기 위해 DI받음
    private final CustomAuthorityUtils authorityUtils;

    public MemberDetailsService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    //UserDetailsService를 implements 하는 구현 클래슨느 loadUserByUsername 추상메서드를 구현해야함
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }

    //MemberDetails 객체를 생성할 때 findMember의 id,Email,Password를 저장해줌
    // 그리고 내부의 getAuthorities메서드에서 db에 저장된 Role를 기반으로 Role를 생성해서 생성한 객체에 넣어줌
    private final class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
