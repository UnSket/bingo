package com.testing.system.data;

import com.testing.system.model.Examinee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ExamineeRepository extends JpaRepository<Examinee, Long> {
    Collection<Examinee> findByToken(int token);
    Examinee findOneByToken(int token);
}
