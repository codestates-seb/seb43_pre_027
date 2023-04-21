package seb43_pre_027.demo.auth.dto;

import lombok.Getter;
/*
클라이언트가 전송한 Username/Password 정보를 Security Filter에서 사용할 수 있도록 역직렬화(Deserialization) 하기 위한 DTO 클래스임


 */
@Getter
public class LoginDto {
    private String username;
    private String password;
}
