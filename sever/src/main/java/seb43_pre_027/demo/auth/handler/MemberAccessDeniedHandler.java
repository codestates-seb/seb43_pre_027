package seb43_pre_027.demo.auth.handler;

import seb43_pre_027.demo.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j//적절한 권한이 없을 경우 호출되는 핸들러로서 handle()메서드에서 처리하고자 하는 로직을 구현하면됨
public class MemberAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());

        // DaoAuthenticationProvider
    }
    //1. accessToken이 만료될경우 다시 생성하는 메서드가 없다
    //2. refreshToken을 BlackList로 저장하는 저장소가 없음
    //redis 를 jwt에 사용하는 이유 -> 데이터 자동 삭제일을 설정할 수 있음
    //key-value형태이기 때문에 적은 메모리로도 데이터를 저장 가능하며 작성속도가 빠름
    //
    //3. 로그인을 할 경우 httpServletRequest에 AccessToken과 RefreshToken을 같이 담아보냄
    //3-1
    //3-1 AccessToken이 있는 경우 -> AccessToken 저장소에 있는 토큰과 비교 -> 일치하면 정상 페이지 진행
    //3-2 AccessToken이 만료된 경우 -> 같이 전달한 RefreshToken이 있는지 확인하고 있으면 저장소에 RefreshToken이 있으면 AccessToken 생성
    //3-3 accessToken, RefreshToken이 둘다 없는 경우 둘다생성
    //4. 로그아웃을 할 경우
    // 전달 받은 AccessToken의 지속시간 accessToken 내부의 expiration을 0으로 변경해줌(삭제가 가능하면 삭제) 그리고 redis저장소에 저장
    // refreshToken이것도 blackList저장소에 저장

}
