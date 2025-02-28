package ee.martin.veebipood.repository;

import ee.martin.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByid(Long id);
}
