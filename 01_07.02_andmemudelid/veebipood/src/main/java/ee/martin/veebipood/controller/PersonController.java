package ee.martin.veebipood.controller;

//controller -> päringute vastuvõtmiseks
//repository -> andmebaasipäringute valmis tegemiseks
//entity -> andmemudelid, tabelid andmebaasis
//@RestController -> võimaldab API päringuid vastu võtta

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

    //front-end peab saatma ID ja parooli
    //TODO: peab saatma emaili ja parooli (muid väljasid ei küsi, nime ei küsi ).
    //TODO: tagastada korralik mudel front-endile, mitte boolean.
    @PostMapping("login")
    public boolean login(@RequestBody Person person) {
        if (person.getId() == null) {
            throw new RuntimeException("ERROR_ID_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()){
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        Person dbperson = personRepository.findById(person.getId()).orElseThrow();
        if (dbperson.getPassword().equals(person.getPassword())) {
            return true;
        }else{
            return false;
        }
    }
    //TODO: pärast ei tagasta listi inimestest.
    @PostMapping("signup")
    public List<Person> signup(@RequestBody Person person) {
        //viga on: {} <-- email === null  ||
        if (person.getEmail() == null ||person.getEmail().isEmpty()) {
            throw new RuntimeException("ERROR_EMAIL_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()){
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        personRepository.save(person);
        return personRepository.findAll();
    }
}