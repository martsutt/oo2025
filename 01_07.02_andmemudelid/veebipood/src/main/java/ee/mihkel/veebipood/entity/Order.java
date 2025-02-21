package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter // encapsulation
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders") // andmebaasis tuleb tabeli nimi "Orders"
public class Order { // PSQLException: ERROR: syntax error at or near "order"
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date created; // Date importida  --> java.util.Date

    @ManyToOne // Personil võib olla mitu tellimust
    private Person person;

    @ManyToMany
    private List<Product> products; // List importida  --> java.util.List

    private double totalSum;

    // Personil
//    @OneToMany
//    private List<Address> address;
}
