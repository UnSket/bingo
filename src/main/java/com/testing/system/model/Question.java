package com.testing.system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	@JsonIgnore
	private long id;
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "sections_questions", joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "section_id", referencedColumnName = "id"))
	private List<Section> sections;

	private String text;
	private String type;
	private String answers;
	@JsonIgnore
	private String correct_answer;
	public Question(){

	}
	public Question(String text, String type, String answers, String correct_answer, Section section) {
		this.text = text;
		this.type = type;
		this.answers = answers;
		this.correct_answer = correct_answer;
		this.sections = new ArrayList<>();
		this.sections.add(section);
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAnswers() {
		return answers;
	}

	public void setAnswers(String answers) {
		this.answers = answers;
	}

	public String getCorrect_answer() {
		return correct_answer;
	}

	public void setCorrect_answer(String correct_answer) {
		this.correct_answer = correct_answer;
	}

	public long getId() {
		return id;
	}

	public String toString1() {
		String answer= "{\"" +type+ "\":{\"answers\":[";
		if(type!="area") {
			String[] mas = answers.split(",");
			for (String ma : mas) {
				answer += "\"" + ma + "\",";
			}
			answer=answer.substring(0,answer.length()-1);
		} else {
			answer += answers;
		}
		answer+="]},\"question\":\""+text+"\"}";
		return answer;
	}
}
