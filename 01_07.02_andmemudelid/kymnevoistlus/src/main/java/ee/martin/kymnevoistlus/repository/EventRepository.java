package ee.martin.kymnevoistlus.repository;

import ee.martin.kymnevoistlus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EventRepository extends JpaRepository<Event, Long> {
}
