package ee.martin.backend.controller;

import ee.martin.backend.entity.Todo;
import ee.martin.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TodoController {

    @Autowired
    TodoRepository todoRepository;

    @GetMapping("todo")
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping("add-todo")
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @DeleteMapping("delete-todo/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }

    @PutMapping("edit-todo")
    public Todo updateTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @GetMapping("/todo/search")
    public List<Todo> searchTodos(@RequestParam String title) {
        return todoRepository.findByTitleContainingIgnoreCase(title);
    }

    @GetMapping("/todo/user/{userId}")
    public List<Todo> getTodosByUser(@PathVariable Long userId) {
        return todoRepository.findByUserId(userId);
    }

    @GetMapping("/todo/user/{userId}/search")
    public List<Todo> searchTodosByUser(
            @PathVariable Long userId,
            @RequestParam String title
    )
    {
        return todoRepository.findByUserIdAndTitleContainingIgnoreCase(userId, title);
    }

}
