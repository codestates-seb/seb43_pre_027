package seb43_pre_027.demo.auth.filter;

import lombok.extern.slf4j.Slf4j;
import seb43_pre_027.demo.auth.jwt.JwtTokenizer;
import seb43_pre_027.demo.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

//Jwt를 검증하는 전용 Security Filter
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {// OncePerRequestFilter를 확장해서 request당 한번만 실행되는 Security Filter를 구현가능
    private final JwtTokenizer jwtTokenizer; //JWT를 검증하고 Claims (우리는 username(email)이랑 Roles를 Claims에 Map으로 저장중)를 얻는 데 사용됨
    private final CustomAuthorityUtils authorityUtils; //검증 성공시 Authentication 객체에 채울 사용자의 권한을 생성하는데 사용함

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // System.out.println("# JwtVerificationFilter");
        //try Catch 문으로 특정 예외 타입의 Exception이 catch되면 해당 Exception을 request.setAttribute("exception", Exception 객체)와 같이
        //HttpServletRequest의 애트리뷰트로 추가됨
        //이렇게 추가된 애트리뷰트는 AuthenticationEntryPoint에서 사용 가능함
        //이렇게 예외 처리를 하게 되면 에러가 발생했을 때 SecurityContext에 클라이언트의 인증 정보(Authentication 객체)가 저장 안됨
        //SecurityContext에 Authentication 객체가 저장되지 않은 상태로 다음 Security Filter로직을 수행하다 보면 결국에는 Filter 내부에서
        // AuthenticationException이 발생하게됨 -> 이 exception은 AuthenticationEntryPoint가 처리하게 됨
        //
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }


        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        //Claims를 파싱할 수 있다는 의미는 내부적으로 서명 검증에 성공했다는 의미 왜?
        //request의 get Header에서 가져온 Authorization(accessToken)과 key를 통해 claims를 호출 하기 때문 만약 잘못된 accessToken을제공한다면
        //claims를 찾지 못할 것임 해당 오류에 대한 처리를 doFilterInternal에서 해주고 있음
        log.info("claims : {}", claims);
        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
