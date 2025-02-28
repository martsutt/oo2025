package ee.martin.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter // encapsulation
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // int
    private String name;
    private double price;
    private String image; //.jpg
    private boolean active;

    //@ManyToMany
    //@ManyToOne
    //@OneToMany
    //@OneToOne. --> User <--> Contact (kontaktandmed)

    @ManyToOne
    private Category category;
}


//    public void setPrice(double price) {
//        this.price = price;
//        System.out.println("Kasutaja xxx muutis hinda. ID: " this.id);
//    }
//}
