package ee.martin.backend.repository;

import ee.martin.backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByTitleContainingIgnoreCase(String title);
    List<Todo> findByUserId(Long userId);
    List<Todo> findByUserIdAndTitleContainingIgnoreCase(Long userId, String title);
}
