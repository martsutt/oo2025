package ee.martin.kymnevoistlus.controller;


import ee.martin.kymnevoistlus.entity.Event;
import ee.martin.kymnevoistlus.entity.Result;
import ee.martin.kymnevoistlus.repository.EventRepository;
import ee.martin.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class EventController {

    @Autowired
    EventRepository eventRepository;
    @Autowired
    private ResultRepository resultRepository;

    @GetMapping("events")
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @PostMapping("events")
    public Event addEvent(@RequestBody Event event) {
        if (event.getName() == null || event.getName().isEmpty()) {
            throw new RuntimeException("ERROR_EVENT_NAME_REQUIRED");
        }
        eventRepository.save(event);
        return event;
    }

    @GetMapping("events/athlete/{athleteId}")
    public List<Event> getEventsByAthlete(@PathVariable Long athleteId) {
        List<Result> results = resultRepository.findByAthleteId(athleteId);
        return results.stream()
                .map(Result::getEvent)
                .distinct() // To avoid duplicates
                .collect(Collectors.toList());
    }
}
