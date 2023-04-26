package seb43_pre_027.demo.security.auth.filter;

import lombok.extern.slf4j.Slf4j;
import seb43_pre_027.demo.security.auth.dto.LoginDto;
import seb43_pre_027.demo.security.auth.jwt.JwtTokenizer;
import seb43_pre_027.demo.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/*
클라이언트의 로그인 인증 정보를 직접적으로 수신하여 인증 처리의 엔트리포인트(Entrypoint) 역할을 하는 Custom Filter
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    //UsernamePasswordAuthenticationFilter를 상속하고 있음 UsernamePasswordAuthenticationFilter는 폼 로그인 방식에서 사용하는
    //Default Security Filter로써 폼 로그인이 아니더라도 Username/Password 기반의 인증을 처리하기 위해 UsernamePasswordAuthenticationFilter를
    //확장해서 구현할 수 있음
    private final AuthenticationManager authenticationManager; //로그인 인증정보를 전달받아 UserDetailsService와 인터랙션 한 뒤 인증 여부를 판단함
    private final JwtTokenizer jwtTokenizer;//인증에 성공할 경우 JWT를 생성 및 발급하는 역할

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }


    @SneakyThrows
    @Override//내부에서 인증을 시도하는 로직
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper(); //httpServletRequest로 전달된 Username,Password를 Dto클래스로 역직렬화(Deserialization)하기 위해
        //ObjectMapper 인스턴스를 생성함
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        //ServletInputStream(HttpSerlvetRequest객체에서 getInputStream()메서드를 통해 ServletInputStream객체를 추출)
        //을 LoginDto 클래스의 객체로 역직렬와 함
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        //loginDto에서 받은 username과 loginDto에서 받은 password를 기반으로 UsernamePasswordAuthenticationToken을 생성
        //authenticationToken : UsernamePasswordAuthenticationToken [Principal=tjdtn@naver.com, Credentials=[PROTECTED],
        // Authenticated=false, Details=null, Granted Authorities=[]]
        return authenticationManager.authenticate(authenticationToken); //생성한 토큰을 맡겨서 authenticationManager인증처리를 위임
    }

    //인증에 성공할 경우 호출됨
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {

        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);
        response.setHeader("Authorization", "Bearer " + accessToken);

        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);

    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();  //해시맵 객체를 새로 생성
//        claims.put("memberId", member.getMemberId());  // 식별자도 포함할 수 있다.
        claims.put("username", member.getEmail()); //claims에 username키와 입력한 email을 value로 넣어준다
        claims.put("roles", member.getRoles()); // claims에 roles키와 member에서 get한 Roles를 value로 넣어준다.

        String subject = member.getEmail(); //username를 가지고옴
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        //액세스 토큰의 만료시간을 설정한다 현재는 30으로 설정되어있음
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //Plain Text 형태인 Secret Key의 Byte[]를 Base64 형식의 문자열로 인코딩해줌 자세한 사항은 JwtTokenizer에서 해당 메서드확인
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        //AccessToken을 생성해준다
        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        //email 가지고옴
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        //리프레시 토큰의 만료시간을 설정한다 현재는 30으로 설정되어있음
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //Plain Text 형태인 Secret Key의 Byte[]를 Base64 형식의 문자열로 인코딩해줌 자세한 사항은 JwtTokenizer에서 해당 메서드확인
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
        //리프레시토큰을 생성해준다
        return refreshToken;
    }
}
