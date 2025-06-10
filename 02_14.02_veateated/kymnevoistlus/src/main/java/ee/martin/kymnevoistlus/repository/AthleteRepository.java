package ee.martin.kymnevoistlus.repository;

import ee.martin.kymnevoistlus.entity.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Page<Athlete> findByCountry(String country, Pageable pageable);
    Page<Athlete> findAll(Pageable pageable);
}