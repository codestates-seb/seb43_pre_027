package seb43_pre_027.demo.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.question.dto.QuestionDto;
import seb43_pre_027.demo.question.dto.QuestionWithCommentResponseDto;
import seb43_pre_027.demo.question.entity.Question;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);
    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);
    QuestionDto.Response questionToQuestionResponseDto(Question question);
    default QuestionWithCommentResponseDto questionToQuestionWithCommentResponseDto(Question question) {
        if (question == null) {
            return null;
        } else {
            QuestionWithCommentResponseDto questionWithCommentResponseDto = new QuestionWithCommentResponseDto();
            questionWithCommentResponseDto.setTitle(question.getTitle());
            questionWithCommentResponseDto.setBody(question.getBody());
            List<String> commentBodys = question.getComments().stream().map(comment -> comment.getBody()).collect(Collectors.toList());
            questionWithCommentResponseDto.setCommentBodys(commentBodys);
            return questionWithCommentResponseDto;
        }
    }
    List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions);
}
