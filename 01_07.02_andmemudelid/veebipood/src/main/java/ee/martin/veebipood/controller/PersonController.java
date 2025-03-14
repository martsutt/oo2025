package ee.martin.veebipood.controller;

import ee.martin.veebipood.entity.Person;
import ee.martin.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    // front-end peab saatma ID ja parooli
    // TODO: peab saatma emaili ja parooli. muid väljasid ei küsi (eesnimi,perenimi)
    // TODO: tagastada korralik mudel front-endile tagasi, mitte boolean
    @PostMapping("login")
    public boolean login(@RequestBody Person person) {
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_ID_MISSING");
        }
        if (person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        Person dbPerson = personRepository.findById(person.getId()).orElseThrow();
        if (dbPerson.getPassword().equals(person.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    //TODO: Ei tagasta pärast signupi inimestelisti
    @PostMapping("signup")
    public List<Person> signup(@RequestBody Person person) {
        // viga on {} - email on 0 või on blank - " "
        if (person.getEmail() == null || person.getEmail().isBlank()) {
            throw new RuntimeException("ERROR_EMAIL_MISSING");
        }
        if (person.getPassword() == null ||person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        personRepository.save(person);
        return personRepository.findAll();
    }
}
