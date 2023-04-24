package seb43_pre_027.demo.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MyQuestionResponseDto {
    private Long questionId;
    private String title;
}
