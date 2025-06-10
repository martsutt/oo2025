package ee.martin.backend.repository;

import ee.martin.backend.entity.TodoUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoUserRepository extends JpaRepository<TodoUser, Long> {
}
