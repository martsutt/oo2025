package ee.martin.kymnevoistlus.controller;


import ee.martin.kymnevoistlus.entity.Athlete;
import ee.martin.kymnevoistlus.entity.Result;
import ee.martin.kymnevoistlus.repository.AthleteRepository;
import ee.martin.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    @GetMapping("/results/athlete/{id}")

    public List<Result> getResultsForAthlete(@PathVariable Long id) {
        return resultRepository.findByAthleteId(id); // Fetch results for the specified athlete
    }

    @GetMapping("/results")

    public List<Result> getResults() {
        return resultRepository.findAll(); // Fetch all results
    }

    @GetMapping("/results/athletes")

    public List<Athlete> getAllAthletesWithScores() {
        return athleteRepository.findAll();
    }

    @PostMapping("results")

    public List<Result> addResult(@RequestBody Result result) {
        if (result.getAthlete() == null || result.getEvent() == null) {
            throw new RuntimeException("ERROR_ATHLETE_AND_EVENT_REQUIRED");
        }
        if (result.getScore() < 0) {
            throw new RuntimeException("ERROR_SCORE_CANNOT_BE_NEGATIVE");
        }
        result.calculatePoints();
        resultRepository.save(result);
        return resultRepository.findAll();
    }

}
