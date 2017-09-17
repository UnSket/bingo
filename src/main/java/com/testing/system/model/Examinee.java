package com.testing.system.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="examinees")
public class Examinee {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;

    private String name;
    private String email;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int token;

    @OneToOne
    private Section section;

    @OneToMany(mappedBy = "examinee")
    private Set<Answers> answers = new HashSet<>();

    public Examinee(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getToken() {
        return token;
    }

    public void setToken() {
        this.token  = (int) (Integer.MIN_VALUE + Math.random()*Integer.MAX_VALUE*2);
    }

    public void setToken(int token) {
        this.token = token;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Set<Answers> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answers> answers) {
        this.answers = answers;
    }
}
