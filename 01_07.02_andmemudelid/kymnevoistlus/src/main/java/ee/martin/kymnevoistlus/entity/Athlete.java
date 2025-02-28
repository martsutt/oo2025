package ee.martin.kymnevoistlus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private short age;
    private String country;
    private boolean active;

    @OneToMany(mappedBy = "athlete")
    private List<Result> results;

    public int getTotalScore() {
        return results.stream().mapToInt(Result::getPoints).sum();
    }
}