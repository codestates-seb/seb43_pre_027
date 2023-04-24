package seb43_pre_027.demo.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.member.dto.MemberPatchDto;
import seb43_pre_027.demo.member.dto.MemberPostDto;
import seb43_pre_027.demo.member.dto.MyQuestionResponseDto;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.question.entity.Question;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    default List<MyQuestionResponseDto> memberToMyQuestionResponseDtos(Member member) {
        List<MyQuestionResponseDto> myQuestionResponseDtos = new ArrayList<>();
        for (int i = 0; i < member.getQuestions().size(); i++) {
            MyQuestionResponseDto myQuestionResponseDto = new MyQuestionResponseDto(member.getQuestions().get(i).getQuestionId(),
                    member.getQuestions().get(i).getTitle());
            myQuestionResponseDtos.add(myQuestionResponseDto);
        }
        return myQuestionResponseDtos;
    }
}