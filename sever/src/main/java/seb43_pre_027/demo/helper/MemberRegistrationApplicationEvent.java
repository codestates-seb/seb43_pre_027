package seb43_pre_027.demo.helper;

import lombok.Getter;
import seb43_pre_027.demo.member.entity.Member;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;

    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }
}
