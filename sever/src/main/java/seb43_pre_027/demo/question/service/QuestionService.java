package seb43_pre_027.demo.question.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seb43_pre_027.demo.exception.BusinessLogicException;
import seb43_pre_027.demo.exception.ExceptionCode;
import seb43_pre_027.demo.member.entity.Member;
import seb43_pre_027.demo.member.service.MemberService;
import seb43_pre_027.demo.question.entity.Question;
import seb43_pre_027.demo.question.repository.QuestionRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service  //저장해야하고, 저장, 삭제 수정 이런 메서드들을 모아놓은 클래스
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    public Question createQuestion(Question question) {
        memberService.findVerifiedMember(question.getMember().getMemberId());
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question,long memberId) {
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
        long currentQuestionMemberId = findQuestion.getMember().getMemberId();
        checkMatchQuestionMemberIdAndInjectedMemberId(memberId, currentQuestionMemberId);

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> findQuestion.setBody(body));
        return questionRepository.save(findQuestion);
    }

    private static void checkMatchQuestionMemberIdAndInjectedMemberId(long memberId, long currentQuestionMemberId) {
        if(currentQuestionMemberId != memberId)  throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
    }

    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }

    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size,
                Sort.by("questionId").descending()));
    }
    public List<Question> findQuestionList() {
        List<Question> all = questionRepository.findAll(Sort.by(Sort.Order.desc("questionId")));
        List<Question> questions = all
                .stream()
                .filter(e -> !e.getQuestionStatus().equals(Question.QuestionStatus.QUESTION_DELETED))
                .collect(Collectors.toList());
        return questions;
    }

    public void deleteQuestion(long questionId, long memberId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        long currentQuestionMemberId = findQuestion.getMember().getMemberId();
        checkMatchQuestionMemberIdAndInjectedMemberId(currentQuestionMemberId, memberId);
        findQuestion.setQuestionStatus(Question.QuestionStatus.QUESTION_DELETED);
        questionRepository.save(findQuestion);
    }

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion =
                questionRepository.findById(questionId);
        Question findQuestion =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        if (findQuestion.getQuestionStatus().equals(Question.QuestionStatus.QUESTION_DELETED)) {
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
        return findQuestion;
    }


    public  void testMockCreate(){
        Member verifiedMember = memberService.findVerifiedMember(1);

        for(int i =0;i<10;i++) {
            Question question = new Question();
            question.setBody("퀘스천 내용" +i);
            question.setMember(verifiedMember);
            question.setQuestionStatus(Question.QuestionStatus.QUESTION_REGISTERED);
            question.setTitle("퀘스천타이틀" +i);
            questionRepository.save(question);
        }
    }

}
