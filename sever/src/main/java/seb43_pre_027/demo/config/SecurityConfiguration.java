package seb43_pre_027.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import seb43_pre_027.demo.security.auth.filter.JwtAuthenticationFilter;
import seb43_pre_027.demo.security.auth.filter.JwtVerificationFilter;
import seb43_pre_027.demo.security.auth.handler.MemberAuthenticationFailureHandler;
import seb43_pre_027.demo.security.auth.handler.MemberAuthenticationSuccessHandler;
import seb43_pre_027.demo.security.auth.jwt.JwtTokenizer;
import seb43_pre_027.demo.security.auth.repository.RefreshTokenRepository;
import seb43_pre_027.demo.security.auth.utils.CustomAuthorityUtils;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

//@Configuration
//@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;


    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, RefreshTokenRepository refreshTokenRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.refreshTokenRepository = refreshTokenRepository;
    }

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
                .apply(new CustomFilterConfigurer())//아래의 CustomConfigurer를 추가해서 커스터마이징된 Configuration을 추가할 수 있음
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/member/*").hasRole("ADMIN")     // (3) 추가
                        .anyRequest().permitAll()
                );
        return http.build();
    }



    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //구현한 Custom filter를 등록하는 역할을 함
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        //Custom Configurer를 구성해 Spring Security의 Configuration을 커스터마이징 할 수 있음
        //AbstractHttpConfigurer를 상속해서 CustomConfigurer를 구현할 수 있음
        //AbstractHttpConfigurer를 상속하는 타입과 HttpSecurityBuilder를 상속하는 타입을 제너릭 타입으로 지정 가능
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            //Spring Security의 설정을 구성하는 SecurityConfigurer 간에 공유되는 객체를 얻을 수 있음

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            //필터를 생성하면서 authenticationManager와 jwtTokenizer를 di해줌
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login"); //기본 디폴트 requestUrl은 "/login"으로설정되어 있고 해당 메서드를 통해
            //해당 필터의 processing url을 지정할 수 있다.
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // 추가
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());  // 추가

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,authorityUtils,refreshTokenRepository);
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);//해당 필터를 추가한다.
        }
    }
}
