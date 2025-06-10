package ee.martin.backend.controller;


import ee.martin.backend.entity.Manager;
import ee.martin.backend.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ManagerController {
    @Autowired
    private ManagerRepository managerRepository;

    @GetMapping("managers")
    public List<Manager> getAll() {
        return managerRepository.findAll();
    }

    @GetMapping("managers/{id}")
    public Manager getOne(@PathVariable Long id) {
        return managerRepository.findById(id).orElse(null);
    }

    @PostMapping("managers")
    public Manager addManager(@RequestBody Manager manager) {
        return managerRepository.save(manager);
    }
}
