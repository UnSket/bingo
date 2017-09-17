package com.testing.system.data;

import com.testing.system.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface QuestionsRepository extends JpaRepository<Question, Long> {
    Collection<Question> findBySectionsName(String name);
}
