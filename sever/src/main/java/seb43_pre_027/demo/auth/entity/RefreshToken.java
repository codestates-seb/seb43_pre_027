package seb43_pre_027.demo.auth.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Collection;
import java.util.Date;

//access token을 따로 저장할 필요는 없다 -> 발행량도 어마어마 할꺼고 토큰을 주면 복호화를 통해 claims안의 개인정보(username와 email같은)를 회사에서
//볼수있음 -> 그냥 주는거 복호화해서 일치하는지 정도만 확인하면 됨
//refresh토큰도 그런의미에서 굳이 복잡하게 들고 있을 필요는 없다 (리프레시 토큰 id설정할 필요도 없고 그냥 준 refresh토큰이 만료되었을 경우 인증처리가 완료되고
//다시 지급하는 정도의 필요성 그래서 키 밸류값이 이상적이긴 함) 심지어 암호화하면 값도 길고 만료되면 사실상 그냥 서버용량만 차지함
// 따라서 redis를 써야함 일정 주기로 데이터를 지울 수 있는 기능이 있기 때문
//jpa같은 경우는 없기 때문에 일일이 지워줘야한다... 아마 1시간 정도를 주기로 refresh토큰 저장소에 있는 토큰을 복호화 해서 만료시간을 확인하고 지난 경우
//토큰값을 repository에서 지워주면 되겠다... 만료시간의 경우에는 굳이 복호화하고 두번 들일만한 정보인가? 위험한 정보인가?
// 위 두가지를 생각해 봤을 때는 토큰을 생성하는 곳에서 저장을 해주는게 맞는거 같다(토큰생성전에)


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@RedisHash(value = "refresh", timeToLive = 300)
public class RefreshToken {
    @Id
    private String id;

    @Indexed
    private String refreshToken;
}
