package seb43_pre_027.demo.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.comment.dto.CommentPatchDto;
import seb43_pre_027.demo.comment.dto.CommentPostDto;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.question.dto.QuestionDto;
import seb43_pre_027.demo.question.entity.Question;
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
  Comment commentPostDtoToComment(CommentPostDto commentPostDto);
  Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);
}
