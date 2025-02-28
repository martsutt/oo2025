package ee.martin.veebipood.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// import jakarta.persistence.Table;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity // loob classi Category tabeli
// @Table(name = "kategooria") VÕIMALIK nii panna tabeli nime teistsuguse kui klassi nime
public class Category { // Categoryl tuleb punane joon alla peale @Entity lisamist kuna tal pole veel primaarvõtit. Igal tabelil peab olema primaarvõti.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // panin primaarvõtmeks Long id - nii peab ise määrama id, iga kord kui ma lisan uue kategooria, ma ise määran id
    private String name;
    //@ColumnDefault("false") on siis vaja kui 1 veergu tahad juurde panna kui teistes on juba andmed sees
    //@ColumnDefault("0") numbri puhul
    private boolean active; // kui tuleb tagantjärgi muudatus, juba on mingid andmed sees, siis tuleb booleani või int või double lisades error
}
