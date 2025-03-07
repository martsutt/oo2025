package ee.martin.libisev_keskmine.repository;

import ee.martin.libisev_keskmine.entity.NumberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NumberEntityRepository extends JpaRepository<NumberEntity, Long> {
}
