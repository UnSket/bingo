package com.testing.system.data;

import com.testing.system.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface QuestionsRepository extends JpaRepository<Question, Long> {
    List<Question> findBySectionsName(String name);
}
