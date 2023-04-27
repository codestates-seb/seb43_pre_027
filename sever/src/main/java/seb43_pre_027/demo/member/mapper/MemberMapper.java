package seb43_pre_027.demo.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.member.dto.MemberDto;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.question.entity.Question;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);

    default List<MemberDto.MyQuestionResponseDto> memberToMyQuestionResponseDtos(Member member) {
        List<MemberDto.MyQuestionResponseDto> myQuestionResponseDtos = new ArrayList<>();
        for (int i = 0; i < member.getQuestions().size(); i++) {
            if(member.getQuestions().get(i).getQuestionStatus().equals(Question.QuestionStatus.QUESTION_DELETED)) continue;
            MemberDto.MyQuestionResponseDto myQuestionResponseDto = new MemberDto.MyQuestionResponseDto(member.getQuestions().get(i).getQuestionId(),
                    member.getQuestions().get(i).getTitle());
            myQuestionResponseDtos.add(myQuestionResponseDto);
        }
        return myQuestionResponseDtos;
    }

    default List<MemberDto.MyCommentResponseDto> memberToMyCommentResponseDtos(Member member) {
        List<MemberDto.MyCommentResponseDto> myCommentResponseDtos = new ArrayList<>();
        for (int i = 0; i < member.getComments().size(); i++) {
            if(member.getComments().get(i).getCommentStatus().equals(Comment.CommentStatus.COMMENT_DELETED)) continue;
            MemberDto.MyCommentResponseDto myCommentResponseDto = new MemberDto.MyCommentResponseDto(
                    member.getComments().get(i).getQuestion().getQuestionId(),
                    member.getComments().get(i).getQuestion().getTitle(),
                    member.getComments().get(i).getCommentId(),
                    member.getComments().get(i).getBody());
            myCommentResponseDtos.add(myCommentResponseDto);
        }
        return myCommentResponseDtos;
    }
}