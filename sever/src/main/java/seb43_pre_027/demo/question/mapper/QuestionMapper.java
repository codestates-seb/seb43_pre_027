package seb43_pre_027.demo.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.question.dto.QuestionDto;
import seb43_pre_027.demo.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);
    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);
    QuestionDto.Response questionToQuestionResponseDto(Question question);
    List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions);
}
