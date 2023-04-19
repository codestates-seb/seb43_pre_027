package seb43_pre_027.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import seb43_pre_027.demo.auth.utils.HelloAuthorityUtils;
import seb43_pre_027.demo.member.repository.MemberRepository;
import seb43_pre_027.demo.member.service.MemberService;
@Configuration
public class JavaConfiguration {

    @Bean
    public MemberService MemberService(MemberRepository memberRepository,
                                       PasswordEncoder passwordEncoder,
                                       HelloAuthorityUtils authorityUtils){
        return new MemberService(memberRepository,passwordEncoder,authorityUtils);
    }

}
