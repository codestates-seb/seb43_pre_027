package seb43_pre_027.demo.comment.service;

import org.springframework.stereotype.Service;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.repository.CommentRepository;
import seb43_pre_027.demo.exception.BusinessLogicException;
import seb43_pre_027.demo.exception.ExceptionCode;

import javax.swing.plaf.PanelUI;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository; //서비스에서 레퍼지토리에 있는 메서들을 이용

    public CommentService(CommentRepository commentRepository) {//생성자 만들기
        this.commentRepository = commentRepository;
    }
    public Comment createComment(Comment comment){
        return commentRepository.save(comment);}
    public Comment updateComment(Comment comment){ //수정
        Comment findComment = findVerifiedComment(comment.getCommentId());// 이 아이디를 통해 해당 댓글이 있는지 확인
    Optional.ofNullable(comment.getBody()).ifPresent(body->findComment.setBody(body));



        return commentRepository.save(findComment);
    }

    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);


    }
    public Comment findVerifiedComment(long commentId){
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            return findComment;
    }
}


