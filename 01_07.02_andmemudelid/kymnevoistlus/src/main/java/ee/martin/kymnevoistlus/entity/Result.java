package ee.martin.kymnevoistlus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Athlete athlete;

    @ManyToOne
    private Event event;

    private int score;
    private int points;

    public void calculatePoints() {
        if (event == null) {
            throw new RuntimeException("ERROR_NO_EVENT");
        }
        if (event.getName().equals("100m Dash")) {
            points = score * 2;
        } else if (event.getName().equals("Long Jump")) {
            points = score * 3;
        } else if (event.getName().equals("Shot Put")) {
            points = score * 4;
        } else if (event.getName().equals("High Jump")) {
            points = score * 5;
        } else if (event.getName().equals("400m Run")) {
            points = score * 6;
        } else if (event.getName().equals("110m Hurdles")) {
            points = score * 7;
        } else if (event.getName().equals("Discus Throw")) {
            points = score * 8;
        } else if (event.getName().equals("Pole Vault")) {
            points = score * 9;
        } else if (event.getName().equals("Javelin Throw")) {
            points = score * 10;
        } else if (event.getName().equals("1500m Run")) {
            points = score * 11;
        } else {
            points = 0;
        }
    }

    public int getPoints() {
        return points;
    }
}
