package seb43_pre_027.demo.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb43_pre_027.demo.audit.Auditable;
import seb43_pre_027.demo.comment.entity.Comment;
import seb43_pre_027.demo.question.entity.Question;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String nickName;
    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String location = "";

    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Member.MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
