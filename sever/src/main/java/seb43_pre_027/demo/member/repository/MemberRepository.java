package seb43_pre_027.demo.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb43_pre_027.demo.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
}
