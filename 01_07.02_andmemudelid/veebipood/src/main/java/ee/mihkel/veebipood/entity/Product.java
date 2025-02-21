package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Hibernate
// automaatselt tekib andmebaasi tabel mis on klassi nimega

// File -> Settings -> Plugins -> JPA Buddy -> Install

// boolean

// String
// char

// Long ->
// int -> 2.1miljardit
// short -> 128
// byte -> 32

// float -> . 8 kohta
// double -> . 16 kohta

@Getter
@Setter // encapsulation
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String image; // .jpg
    private boolean active;

    // Parem pool tähistab kas on List<> või ainsus
    // Vasak pool tähistab kas saan taaskasutada

    // @ManyToMany
    // @ManyToOne <-
    // @OneToMany
    // @OneToOne <-

    // OneToOne ---> User <-> Contact

    @ManyToOne
    private Category category;

//    public void setPrice(double price) {
//        this.price = price;
//        System.out.println("Kasutaja xxx muutis hinda. ID: " + this.id);
//    }
}

// kui on väikse tähega:
// long
// char
// double
// boolean
// primitiivsed väärtused. ainult väärtuse hoidmiseks

// kui on suure tähega:
// Long
// String
// Character
// Double
// Boolean
// klassiväärtused. nende sees on ka funktsioonid.

