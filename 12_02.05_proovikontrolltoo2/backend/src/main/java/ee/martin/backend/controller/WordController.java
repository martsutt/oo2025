package ee.martin.backend.controller;


import ee.martin.backend.entity.Word;
import ee.martin.backend.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class WordController {
    @Autowired
    private WordRepository wordRepository;

    @GetMapping("words")
    public Page<Word> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "word") String sort,
            @RequestParam(defaultValue = "asc") String dir
    ) {
        Sort.Direction direction = dir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));
        return wordRepository.findAll(pageable);
    }

    @GetMapping("words/{id}")
    public Word getWord(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow();
    }

    @PostMapping("words")
    public Word addWord(@RequestBody Word word) {
        return wordRepository.save(word);
    }

    @DeleteMapping("words/{id}")
    public List<Word> deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
        return wordRepository.findAll();
    }

    @PutMapping("words")
    public Word updateWord(@RequestBody Word word) {
        if(word.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if(word.getWord() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_WORD");
        }
        if(word.getDescription() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_DESCRIPTION");
        }
        wordRepository.save(word);
        return wordRepository.findById(word.getId()).orElseThrow();
    }

}
