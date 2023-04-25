package seb43_pre_027.demo.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.question.dto.CommentBody;
import seb43_pre_027.demo.question.dto.QuestionDto;
import seb43_pre_027.demo.question.entity.Question;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);
    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);
    QuestionDto.Response questionToQuestionResponseDto(Question question);
    default QuestionDto.QuestionWithCommentResponseDto questionToQuestionWithCommentResponseDto(Question question) {
        if (question == null) {
            return null;
        } else {
            QuestionDto.QuestionWithCommentResponseDto questionWithCommentResponseDto = new QuestionDto.QuestionWithCommentResponseDto();
            questionWithCommentResponseDto.setTitle(question.getTitle());
            questionWithCommentResponseDto.setBody(question.getBody());
            questionWithCommentResponseDto.setModifiedAt(question.getModifiedAt());
            questionWithCommentResponseDto.setCreatedAt(question.getCreatedAt());
            questionWithCommentResponseDto.setNickName(question.getMember().getNickName());
            List<CommentBody> commentBodies = new ArrayList<>();
            boolean isAdopted = false;
            for (int i = 0; i < question.getComments().size(); i++) {
                if (question.getComments().get(i).isAdopt() && !question.getComments().get(i).getCommentStatus().equals(Comment.CommentStatus.COMMENT_DELETED)) {
                    CommentBody cb = new CommentBody(question.getComments().get(i).getBody(),
                            question.getComments().get(i).getMember().getNickName());
                    commentBodies.add(cb);
                    isAdopted = true;
                    question.getComments().remove(i);
                    break;
                }
            }
            int a = 0;
            if (isAdopted) {
                a = 1;
            }
            for(int i = a; i < question.getComments().size(); i++) {
                if(!question.getComments().get(i).getCommentStatus().equals(Comment.CommentStatus.COMMENT_DELETED))
                {
                    CommentBody cb = new CommentBody(question.getComments().get(i).getBody(),
                            question.getComments().get(i).getMember().getNickName());
                    commentBodies.add(cb);
                }
            }
            questionWithCommentResponseDto.setCommentBodys(commentBodies);
            return questionWithCommentResponseDto;
        }
    }
    List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions);
}
