package seb43_pre_027.demo.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb43_pre_027.demo.audit.Auditable;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.question.entity.Question;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, length = 10000)
    private String body;

    @Column(nullable = false)
    private Integer likeCount;
    @Column(nullable = false)
    private Boolean adopt;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

}
