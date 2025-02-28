package ee.martin.kymnevoistlus.repository;

import ee.martin.kymnevoistlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
}