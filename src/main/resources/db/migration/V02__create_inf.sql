insert into questions(text, type, answers, correct_answer) values('Вопрос номер 1','radio','answ1,answ2,answ3','answ1');
insert into questions(text, type, answers, correct_answer) values('Вопрос номер 2','checkbox','answ1,answ2,answ3','answ1');
insert into questions(text, type, answers, correct_answer) values('Вопрос номер 3','radio','answ1,answ2,answ3','answ2');
insert into questions(text, type, answers, correct_answer) values('Вопрос номер 4','area','Подсказка для ответа','answer');

insert into sections (name) values('section1');
insert into sections (name) values('section2');

insert into sections_questions values(1,1);
insert into sections_questions values(1,2);
insert into sections_questions values(2,3);
insert into sections_questions values(2,4);