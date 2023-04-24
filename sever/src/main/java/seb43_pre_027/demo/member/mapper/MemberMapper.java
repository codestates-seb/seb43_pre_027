package seb43_pre_027.demo.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.member.dto.MemberDto;
import seb43_pre_027.demo.member.entity.Member;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);

    default List<MemberDto.MyQuestionResponseDto> memberToMyQuestionResponseDtos(Member member) {
        List<MemberDto.MyQuestionResponseDto> myQuestionResponseDtos = new ArrayList<>();
        for (int i = 0; i < member.getQuestions().size(); i++) {
            MemberDto.MyQuestionResponseDto myQuestionResponseDto = new MemberDto.MyQuestionResponseDto(member.getQuestions().get(i).getQuestionId(),
                    member.getQuestions().get(i).getTitle());
            myQuestionResponseDtos.add(myQuestionResponseDto);
        }
        return myQuestionResponseDtos;
    }
}