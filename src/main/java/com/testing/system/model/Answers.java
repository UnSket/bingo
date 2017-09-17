package com.testing.system.model;

import javax.persistence.*;
@Entity @Table(name="answers")
public class Answers {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Examinee examinee;

    @OneToOne
    private Question question;

    private String answer;

    public Answers(){

    }

    public Answers(Examinee examinee, Question question, String answer) {
        this.examinee = examinee;
        this.question = question;
        this.answer = answer;
    }

    public Examinee getExaminee() {
        return examinee;
    }

    public void setExaminee(Examinee examinee) {
        this.examinee = examinee;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
