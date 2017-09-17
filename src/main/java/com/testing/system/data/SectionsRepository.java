package com.testing.system.data;

import com.testing.system.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;


public interface SectionsRepository extends JpaRepository<Section, Long>{
    Collection<Section> findByQuestionsId(Long id);
   Section findByName(String name);
}
