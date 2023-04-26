package seb43_pre_027.demo.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.member.dto.MemberPetchDto;
import seb43_pre_027.demo.member.dto.MemberPostDto;
import seb43_pre_027.demo.member.entity.Member;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPetchDtoToMember(MemberPetchDto memberPetchDto);

}
