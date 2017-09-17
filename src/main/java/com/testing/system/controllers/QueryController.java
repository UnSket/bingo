package com.testing.system.controllers;

import java.util.Collection;

import com.testing.system.data.AnswersRepository;
import com.testing.system.data.ExamineeRepository;
import com.testing.system.data.QuestionsRepository;
import com.testing.system.data.SectionsRepository;
import com.testing.system.model.Answers;
import com.testing.system.model.Examinee;
import com.testing.system.model.Question;
import com.testing.system.model.Section;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class QueryController {

	private QuestionsRepository questionData;
	private SectionsRepository sectionsData;
	private AnswersRepository answersData;
	private ExamineeRepository examineedata;

	@Autowired
	public QueryController(QuestionsRepository questionData, SectionsRepository sectionsData, AnswersRepository answersData, ExamineeRepository examineedata) {
		this.questionData = questionData;
		this.sectionsData = sectionsData;
		this.answersData = answersData;
		this.examineedata = examineedata;
	}


	//создает нового пустого пользователя назначает ему токен, и секцию возвращает токен
	// пример: http://localhost:8080/newExaminee?section=back (только постом передаешь)
	//создастся новый пользователь с вопросами по секции с именем "back", если такой секции нету вернет false
	@PostMapping(value = "/newExaminee")
	ResponseEntity<String> newExaminee(@RequestParam("section") String section){
		Examinee examinee = new Examinee();
		if(sectionsData.findByName(section) != null){
			examinee.setSection(sectionsData.findByName(section));
		} else {
			return ResponseEntity.ok("false");
		}
		examinee.setToken();
		while(examineedata.findOneByToken(examinee.getToken()) != null){
			examinee.setToken();
			System.out.println(examineedata.findByToken(examinee.getToken()).size());
		}
		examineedata.saveAndFlush(examinee);
		return ResponseEntity.ok(examinee.getToken()+"");
	}
	//Добавляет данные имени и почты пользавателю с переданным токеном, ничего не возвращает в случае успеха, в случае ошибки вернет false
	@PostMapping("/registration")
	ResponseEntity<String> registarateExaminee(@RequestParam("token") int token,
											   @RequestParam("name") String name,
											   @RequestParam("email") String email){
		Examinee examinee = examineedata.findOneByToken(token);
		if(examinee != null){
			examinee.setName(name);
			examinee.setEmail(email);
			examineedata.save(examinee);
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.ok("false");
		}
	}

	//Добавляет ответ пользавателю с переданным токеном, в случае успеха вернет строку "Успех", в случае ошибки вернет "false"
	@PostMapping("/addAnswer")
	ResponseEntity<String> addAnswer(@RequestParam("answer") String answer,
									 @RequestParam("token") int token){
		Examinee examinee = examineedata.findOneByToken(token);
		if(examinee != null) {
			if (examinee.getSection().getQuestions().size() >
					examinee.getAnswers().size()){
				examinee.getAnswers().add(answersData.save(new Answers(examinee, (Question) (examinee.getSection().getQuestions().toArray())
						[examinee.getAnswers().size()], answer)));
				ResponseEntity.ok("Успех");
			}
		}
		return ResponseEntity.ok("false");
	}

	//возвращает следующий вопрос пользователю с переданным токеном. Если вопросы по его секции кончились, то вернет "end", в случае ошибки вернет "false"
	@GetMapping(value="/getQuestion")
	public ResponseEntity<String> getQuestion(@RequestParam("token") int token){
		Examinee examinee = examineedata.findOneByToken(token);
		if(examinee != null) {
			if (examinee.getSection().getQuestions().size() >
					examinee.getAnswers().size())
				return ResponseEntity.ok(((Question)(examinee.getSection().getQuestions().toArray()
						[examinee.getAnswers().size()])).toString1());
			else {
				return ResponseEntity.ok("end");
			}
		} else {
			return ResponseEntity.ok("false");
		}
	}


	/*@GetMapping(value="/getQuestionBySectionName")
	public ResponseEntity<Collection> getQuestionsBySectionId(@RequestParam("name") String sectionName){
		return ResponseEntity.ok(questionData.findBySectionsName(sectionName));
	}*/
	@PutMapping(value="/addQuestion")
	public ResponseEntity<String> add(@RequestParam("jsonObj") String json){
		JSONObject jsonObject = new JSONObject(json);
		//проверить входящие данные
		questionData.save(new Question(jsonObject.getJSONObject("question").getString("text"),
				jsonObject.getJSONObject("question").getString("type"),
				jsonObject.getJSONObject("question").getString("answers"),
				jsonObject.getJSONObject("question").getString("correct_answer"),
				sectionsData.findByName(jsonObject.getString("section"))));
		return ResponseEntity.ok("Успех");
	}

	@PutMapping(value = "/addSection")
	public ResponseEntity<String> addSection(@RequestParam("json") String json){
		JSONObject jsonObject = new JSONObject(json);
		sectionsData.save(new Section(jsonObject.getString("section")));
		return ResponseEntity.ok("Успех");
	}

	//добавляет вопрос с заданными полями
	@GetMapping(value="/addQuestionByGet")
	public ResponseEntity<String> add(@RequestParam("text") String text, @RequestParam("type") String type, @RequestParam("answers") String answers, @RequestParam("correct_answer") String correct_answer){
		return ResponseEntity.ok("");
	}

	@GetMapping(value="/getSections")
	public ResponseEntity<String> getSections(){
		String answer="{\"sections\":"+sectionsData.findAll().toString()+"}";
		System.out.println(answer);
		return ResponseEntity.ok(answer);
	}

}
