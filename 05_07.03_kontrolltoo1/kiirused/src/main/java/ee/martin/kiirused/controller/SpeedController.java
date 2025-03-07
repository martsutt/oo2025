package ee.martin.kiirused.controller;

import ee.martin.kiirused.entity.Speed;
import ee.martin.kiirused.entity.SpeedInMiles;
import ee.martin.kiirused.repository.SpeedInMilesRepository;
import ee.martin.kiirused.repository.SpeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class SpeedController {

    @Autowired
    SpeedRepository speedRepository;

    @Autowired
    SpeedInMilesRepository speedInMilesRepository;

    @GetMapping("speed/values")
    public List<Speed> getSpeeds() {
        return speedRepository.findAll();
    }

    @PostMapping("speed/addvalues")
    public List<Speed> addSpeed(@RequestBody Speed speed) {
        if (speed.getValue() < 0) {
            throw new RuntimeException("ERROR_SPEED_CANNOT_BE_NEGATIVE");
        }
        try {
            Double.parseDouble(String.valueOf(speed.getValue()));
        } catch (NumberFormatException e) {
            throw new RuntimeException("ERROR_SPEED_MUST_BE_A_NUMBER");
        }
        speedRepository.save(speed);
        return speedRepository.findAll();
    }

    @GetMapping("speed/values/average")
    public double getAverageSpeed() {
        List<Speed> speeds = speedRepository.findAll();
        int total = 0;
        for (Speed speed : speeds) {
            total += speed.getValue();
        }
        double average = (double) total / speeds.size();
        return average;
    }

    @GetMapping("speed/values/mph")
    public List<Double> getSpeedsMPH() {
        List<Speed> speeds = speedRepository.findAll();
        List<Double> mphValues = speeds.stream().map(speed -> speed.getValue() * 0.621371).toList();

        for (Double mphValue : mphValues) {
            SpeedInMiles speedInMiles = new SpeedInMiles();
            speedInMiles.setSpeed(mphValue);
            speedInMilesRepository.save(speedInMiles);
        }
        return mphValues;
    }

    @PutMapping("speed/values/increaseby1/{id}")
    public Speed increaseSpeed(@PathVariable Long id) {
        Speed speed = speedRepository.findById(id).orElseThrow(() -> new RuntimeException("ERROR_SPEED_NOT_FOUND"));
        speed.setValue(speed.getValue() + 1);
        return speedRepository.save(speed);
    }
}
