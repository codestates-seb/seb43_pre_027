package seb43_pre_027.demo.comment.service;

import org.springframework.stereotype.Service;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.comment.repository.CommentRepository;
import seb43_pre_027.demo.exception.BusinessLogicException;
import seb43_pre_027.demo.exception.ExceptionCode;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.service.MemberService;

import javax.swing.plaf.PanelUI;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository; //서비스에서 레퍼지토리에 있는 메서들을 이용
    private final MemberService memberService;

    public CommentService(CommentRepository commentRepository, MemberService memberService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
    }

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment,long memberId){
        //수정
        Comment findComment = findVerifiedComment(comment.getCommentId());// 이 아이디를 통해 해당 댓글이 있는지 확인
        Long currentCommentMemberId = findComment.getMember().getMemberId();
        checkMatchCommentMemberIdAndInjectedMemberId(memberId, currentCommentMemberId);

        Optional.ofNullable(comment.getBody()).ifPresent(body->findComment.setBody(body));

        return commentRepository.save(findComment);
    }

    private static void checkMatchCommentMemberIdAndInjectedMemberId(long memberId, Long currentCommentMemberId) {
        if(currentCommentMemberId != memberId)  throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
    }

    public void deleteComment(long commentId,long memberId) {
        Comment findComment = findVerifiedComment(commentId);
        Long currentCommentMemberId = findComment.getMember().getMemberId();
        checkMatchCommentMemberIdAndInjectedMemberId(memberId, currentCommentMemberId);
        findComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELETED);
        commentRepository.save(findComment);
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


