package ee.martin.backend.repository;

import ee.martin.backend.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WordRepository extends JpaRepository<Word, Long> {
    Page<Word> findAll(Pageable pageable);
}