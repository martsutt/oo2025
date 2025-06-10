package ee.martin.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter //encapsulation
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders") //andmebassi tuleb tabelinimi "orders"

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date; //Date importida --> import java.util.Date;

    @ManyToOne
    private Person person;

    @ManyToMany
    private List<Product> products;  //list importida --> import java.util.List;

    private double totalSum;
}