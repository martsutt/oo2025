package ee.martin.kymnevoistlus.controller;

import ee.martin.kymnevoistlus.entity.Athlete;
import ee.martin.kymnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;

    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return athleteRepository.findAll();
    }

    @PostMapping("athletes")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if(athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_REQUIRED");
        }
        if(athlete.getAge() <= 0) {
            throw new RuntimeException("ERROR_AGE_CANNOT_BE_NEGATIVE");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
}