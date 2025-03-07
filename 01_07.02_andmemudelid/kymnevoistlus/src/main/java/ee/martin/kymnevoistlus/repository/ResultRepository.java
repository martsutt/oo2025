package ee.martin.kymnevoistlus.repository;

import ee.martin.kymnevoistlus.entity.Athlete;

import ee.martin.kymnevoistlus.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByAthlete(Athlete athlete);
    List<Result> findByAthleteId(Long athleteId);
}