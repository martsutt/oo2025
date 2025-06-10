package ee.martin.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//hibernate
//automaatselt tekib andmebaasi tabel, mis on klassi nimega
//settings -> plugins -> JPA buddy -> install

//Andmebaasi sisestatakse:
//boolean

//Sting
//char

//int -> 2.1miljardit
//long ->
//short -> 128
//byte -> 32

//float -> . 8 kohta
//double -> . 16 kohta

//private ei vaja Getterit ega Setterit
@Getter
@Setter //encapsulation
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String image;
    private boolean active;

    //@ManyToMany
    //@OneToMany
    //@ManyToOne
    //OneToOne -> Siis kui teen nt usery ja tema kontakt andmed

    @ManyToOne
    private Category category;
}