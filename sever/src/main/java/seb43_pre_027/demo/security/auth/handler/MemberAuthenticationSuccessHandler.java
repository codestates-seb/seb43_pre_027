package seb43_pre_027.demo.security.auth.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Iterator;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler { //Custom AuthenticationSuccessHandler는 해당 인터페이스를 구현해야함
    @Override //AuthenticationSuccessHandler에는 onAuthenticationSuccess() 추상 메서드가 정의되어 있으며, onAuthenticationSuccess()메서드를 구현해서 추가 처리함
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업을 할 수 있다.

        log.info("# Authenticated successfully!");
    }
}
