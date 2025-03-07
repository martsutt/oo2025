package ee.martin.kymnevoistlus.controller;


import ee.martin.kymnevoistlus.entity.Athlete;
import ee.martin.kymnevoistlus.entity.Event;
import ee.martin.kymnevoistlus.entity.Result;
import ee.martin.kymnevoistlus.repository.AthleteRepository;
import ee.martin.kymnevoistlus.repository.EventRepository;
import ee.martin.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class ResultController {
    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    @GetMapping("results/athlete/{athleteId}")
    public List<Result> getResultsByAthlete(@PathVariable Long athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId).orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));
        return resultRepository.findByAthlete(athlete);
    }

    @GetMapping("results/athlete/{athleteId}/totalscore")
    public double getTotalScore(@PathVariable Long athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId).orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));
        List<Result> results = resultRepository.findByAthlete(athlete);
        return results.stream().mapToDouble(Result::getScore).sum();
    }

    @PostMapping("/results")
    public Result addResult(@RequestBody Result result) {
        Athlete athlete = athleteRepository.findById(result.getAthlete().getId()).orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));
        Event event = eventRepository.findById(result.getEvent().getId()).orElseThrow(() -> new RuntimeException("ERROR_EVENT_NOT_FOUND"));
        double points = calculatePoints(event.getId(), result.getScore());
        result.setScore(points);
        result.setAthlete(athlete);
        result.setEvent(event);
        return resultRepository.save(result);
    }

    private double calculatePoints(Long eventId, double result) {
        int eventNumber = eventId.intValue();
        double multiplier = eventNumber + 1;
        return result * multiplier;
    }
}
