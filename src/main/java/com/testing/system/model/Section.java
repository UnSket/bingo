package com.testing.system.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="sections")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "sections_questions", joinColumns = @JoinColumn(name = "section_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    private List<Question> questions;

    private String name;

    public Section(){

    }

    public Section(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public String toString(){
        String answer="{\"name\":\""+name+"\",\"questions\":[";
        ObjectMapper objectMapper = new ObjectMapper();
        if(questions.size()>0) {
            for (Question question : questions) {
                try {
                    answer += objectMapper.writeValueAsString(question) + ",";
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

            }
            answer = answer.substring(0,answer.length()-1) + "]}";
        } else {
            answer = answer.substring(0,answer.length()-1) + "\"\"}";
        }
        return answer;
    }

}
