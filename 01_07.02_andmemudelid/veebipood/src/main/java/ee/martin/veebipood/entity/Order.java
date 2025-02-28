package ee.martin.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;

import java.util.Date;
import java.util.List;

@Getter
@Setter // encapsulation
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders") // andmebaasis tuleb tabeli nimi "Orders"
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // int
    private Date created;

    @ManyToOne
    private Person person;

    @ManyToMany
    private List<Product> products;

    private double totalSum;
}
