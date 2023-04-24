package seb43_pre_027.demo.comment.entity;

import lombok.*;
import seb43_pre_027.demo.audit.Auditable;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.question.entity.Question;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, length = 10000)
    private String body;

    @Column
    private int likeCount;

    @Column
    private boolean adopt;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Comment.CommentStatus commentStatus = CommentStatus.COMMENT_REGISTERED;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    public enum CommentStatus {
        COMMENT_REGISTERED("댓글 등록"),
        COMMENT_DELETED("댓글 삭제");

        @Getter
        private String status;

        CommentStatus(String status) {
            this.status = status;
        }
    }
}
