package seb43_pre_027.demo.auth.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import seb43_pre_027.demo.auth.entity.RefreshToken;
import seb43_pre_027.demo.auth.repository.RefreshTokenRepository;

import java.nio.charset.StandardCharsets;
import java.security.InvalidParameterException;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
@Slf4j
@Component //JwtTokenizer클래스를 Spring Container(ApplicationContext)에 Bean으로 등록하기 위해 추가한 애너테이션
public class JwtTokenizer {
    private final RefreshTokenRepository refreshTokenRepository;

    public JwtTokenizer(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    //Plain Text 형태인 Secret Key의 Byte[]를 Base64 형식의 문자열로 인코딩해줌
    //왜 Plain Text 자체를 Secret Key로 사용하지 않음? -> 암호학적인 작업에 사용되는 Key가 항상 바이너리(byte array)라는 사실과 맞지 않는
    //것을 감안하여 Plain Textg 자체를 Secret Key로 사용하는 것을 권장하지 않음
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);//Base64 형식의 Secret Key 문자열을 이요해 Key(java.security.Key)
                                                                    //객체를 얻음

        return Jwts.builder()
                .setClaims(claims) //JWT에 포함시킬 Custom Claims를 추가함 Custom Claims에는 주로 인증된 사용자와 관련된 정보를 추가함
                //현재 claims에는  claims.put("username", member.getEmail()); claims.put("roles", member.getRoles());
                //두 값이 들어있음
                .setSubject(subject) //JWT에 대한 제목을 추가함 지금 username(email)로 설정되어있음
                .setIssuedAt(Calendar.getInstance().getTime()) //JWT 발행 일자를 설정하는데 파라미터 타입은 java.util.Date 타입
                .setExpiration(expiration) //JWT의 만료 일시를 지정함 파라미터 타입은 java.util.Date 타입
                .signWith(key) //서명을 위한 Key(java.security.Key)객체를 설정함
                .compact(); // JWT를 생성하고 직렬화함
    }

    //Access Token이 만료되었을 경우 Access Token을 새로 생성할 수 있게 해주는 Refresh Token을 생성하는 메서드
    //Access Token을 새로 발급해 주는 역할을 하는 Token이기 때문에 별도의 Custom Claims는 추가할 필요가 없음
    // ->인증된 사용자와 관련된 정보를 굳이 추가할 필요가 없음
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
        String compact = Jwts.builder()
                .setSubject(subject) //subject는 username:email이 들어감
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setRefreshToken(compact);
        return compact;
    }

    // 검증 후, Claims을 반환 하는 용도
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    // 단순히 검증만 하는 용도로 쓰일 경우
    //jjwt에서는 JWT를 생성할 때 서명에 사용된 Secret Key를 이용해 내부적으로 Signature를 검증한 후, 검증에 성공하면 JWT를 파싱해서 Claims를 얻을 수 있음
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key) // 서명에 사용된 SecretKey를 설정함
                .build()
                .parseClaimsJws(jws); //JWT를 파싱해서 Claims를 얻을 수 있음
    }

    //JWT의 만료 일시를 지저앟기 위한 메서드로 JWT 생성 시 사용됨
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }
    public Claims validTokenAndReturnBody(String token,String base64EncodedSecretKey){
        try {
            Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch(ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
            e.printStackTrace();
            throw new InvalidParameterException("유효하지 않은 토큰입니다");
        }
    }
    public boolean checkTokenExpiration(String token){
        String encodeBase64SecretKey = encodeBase64SecretKey(secretKey);
        Date expiration = validTokenAndReturnBody(token,encodeBase64SecretKey).getExpiration();
        return expiration.before(new Date());
    }

    //JWT의 서명에 사용할 Secret Key를 생성하는 역할
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey); //Base64형식으로 인코딩 된 Secret Key를 디코딩 한 후 byte array를 반환
        Key key = Keys.hmacShaKeyFor(keyBytes);//key byte array를 기반으로 적절한 HAMC 알고리즘을 적용한 Key(java.security.Key) 객체를 생성함
        //jjwt 0.9.x 버전에서는 서명 과정에서 HMAC 알고리즘을 직접 지정해야 했지만 최신 버전에서는 내부적으로 적절한 HMAC 알고리즘을 지정해줌!
        //과거 방식 .signWith(key, SignatureAlgorithm.HS256) -> 사인 알고리즘을 지정해주고 있는것을 볼 수 있음

        return key;
    }
}
