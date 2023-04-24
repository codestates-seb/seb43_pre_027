package seb43_pre_027.demo.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.comment.dto.CommentDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.question.entity.Question;
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {


  default Comment commentPostDtoToComment(CommentDto.Post commentPostDto, Member member, Question question){
    if (commentPostDto == null) {
      return null;
    } else {
      Comment comment = new Comment();
      comment.setCommentStatus(Comment.CommentStatus.COMMENT_REGISTERED);
      comment.setQuestion(question);
      comment.setMember(member);
      comment.setBody(commentPostDto.getBody());
      return comment;
    }

  }
  Comment commentPatchDtoToComment(CommentDto.Patch commentPatchDto);
}
