package seb43_pre_027.demo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import seb43_pre_027.demo.auth.filter.JwtAuthenticationFilter;
import seb43_pre_027.demo.auth.filter.JwtVerificationFilter;
import seb43_pre_027.demo.auth.handler.MemberAccessDeniedHandler;
import seb43_pre_027.demo.auth.handler.MemberAuthenticationEntryPoint;
import seb43_pre_027.demo.auth.handler.MemberAuthenticationFailureHandler;
import seb43_pre_027.demo.auth.handler.MemberAuthenticationSuccessHandler;
import seb43_pre_027.demo.auth.jwt.JwtTokenizer;
import seb43_pre_027.demo.auth.utils.CustomAuthorityUtils;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.oauth.handler.OAuth2MemberSuccessHandler;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfigurationV2 {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()  // 추가
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가
                .and()
                .apply(new CustomFilterConfigurer())  // 추가
                .and()
                .authorizeHttpRequests(authorize -> authorize // url authorization 전체 추가
                    .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService))  // (1)
                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 주의 사항: 컨텐츠 표시 오류로 인해 '/**'를 '\/**'로 표기했으니 실제 코드 구현 시에는 '\(역슬래시)'를 빼 주세요.

        return source;
    }

    // 추가
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class); // (2)
        }
    }
}
