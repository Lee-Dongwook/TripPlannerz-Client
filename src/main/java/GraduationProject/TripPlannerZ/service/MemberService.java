package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // 회원 가입
    @Transactional
    public Long join(Member member) {
        memberRepository.save(member);
        return member.getId();
    }

    // 중복 회원 검색
    public Optional<Member> validateDuplicateMember(String email) {
        return memberRepository.findByEmail(email);
    }
}