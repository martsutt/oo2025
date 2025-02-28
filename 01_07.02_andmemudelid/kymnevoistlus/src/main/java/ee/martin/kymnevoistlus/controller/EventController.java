package ee.martin.kymnevoistlus.controller;


import ee.martin.kymnevoistlus.entity.Event;
import ee.martin.kymnevoistlus.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping("events")
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @PostMapping("events")
    public List<Event> addEvent(@RequestBody Event event) {
        if (event.getName() == null || event.getName().isEmpty()) {
            throw new RuntimeException("ERROR_EVENT_NAME_REQUIRED");
        }
        eventRepository.save(event);
        return eventRepository.findAll();
    }
}
