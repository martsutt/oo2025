package ee.martin.veebipood.repository;

import ee.martin.veebipood.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//                                           See Määrab
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Tagastab ainult Product või List<Product>
    // JPA buddy --> JPA designer
    //file --> settings --> plugins -->jpa buddy

    Page<Product> findByCategory_Id(Long id, Pageable pageable);
}