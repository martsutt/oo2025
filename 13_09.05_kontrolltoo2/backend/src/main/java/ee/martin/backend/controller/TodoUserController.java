package ee.martin.backend.controller;

import ee.martin.backend.entity.TodoUser;
import ee.martin.backend.repository.TodoUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TodoUserController {

    @Autowired
    TodoUserRepository todoUserRepository;

    @GetMapping("/users")
    public List<TodoUser> getAllUsers() {
        return todoUserRepository.findAll();
    }

    @PostMapping("/add-user")
    public TodoUser addUser(@RequestBody TodoUser user) {
        return todoUserRepository.save(user);
    }
}
