package ee.martin.kymnevoistlus.controller;

import ee.martin.kymnevoistlus.entity.Athlete;
import ee.martin.kymnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;

    @GetMapping("athletes")
    public Page<Athlete> getAthletes(
            @RequestParam(required = false) String country,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        if (country != null && !country.isEmpty()) {
            return athleteRepository.findByCountry(country, pageable);
        } else {
            return athleteRepository.findAll(pageable);
        }
    }

    @GetMapping("athletes/countries")
    public List<String> getAllCountries() {
        return athleteRepository.findAll()
                .stream()
                .map(Athlete::getCountry)
                .distinct()
                .toList();
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

    @PutMapping("athletes/{id}")
    public Athlete updateAthlete(@PathVariable Long id, @RequestBody Athlete updatedAthlete) {
        Athlete athlete = athleteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));
        athlete.setName(updatedAthlete.getName());
        athlete.setAge(updatedAthlete.getAge());
        athlete.setCountry(updatedAthlete.getCountry());
        athlete.setActive(updatedAthlete.isActive());
        return athleteRepository.save(athlete);
    }
}