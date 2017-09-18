create table questions(
id int not null primary key auto_increment,
text varchar(255) not null,
answers varchar(255) not null,
correct_answer varchar(255),
type varchar(255) not null
);

create table sections (
id int not null primary key auto_increment,
name varchar(255)
);

CREATE TABLE sections_questions(
  section_id int(10) unsigned NOT NULL,
  question_id int(10) unsigned NOT NULL,
  PRIMARY KEY (section_id ,question_id ),
  CONSTRAINT fk_sectionsquestions_questions FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_sectionsquestions_sections FOREIGN KEY (section_id) REFERENCES sections (id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table examinees(
id int not null primary key auto_increment,
name varchar(255),
email varchar(255),
section_id int
);

create table answers(
id int not null primary key auto_increment,
examinee_id int,
question_id int,
answer varchar(255),
);

