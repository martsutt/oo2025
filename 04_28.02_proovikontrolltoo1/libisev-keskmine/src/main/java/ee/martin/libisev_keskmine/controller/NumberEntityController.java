package ee.martin.libisev_keskmine.controller;


import ee.martin.libisev_keskmine.entity.NumberEntity;
import ee.martin.libisev_keskmine.repository.NumberEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NumberEntityController {

    @Autowired
    NumberEntityRepository numberEntityRepository;

    @GetMapping("numbers")
    public List<NumberEntity> getNumbers() {
        return numberEntityRepository.findAll();
    }

    @PostMapping("addnumbers")
    public List<NumberEntity> addNumbers(@RequestBody NumberEntity numberEntity) {
        numberEntityRepository.save(numberEntity);
        return numberEntityRepository.findAll();
    }

    @GetMapping("numbers/sum")
    public Long getSum() {
        List<NumberEntity> numbers = numberEntityRepository.findAll();
        long sum = 0;
        for (NumberEntity number : numbers) {
            sum += number.getValue();
        }
        return sum;
    }

    @GetMapping("numbers/avg")
    public Double getAverage() {
        List<NumberEntity> numbers = numberEntityRepository.findAll();
        if (numbers.isEmpty()) {
            return 0.0;
        }
        double sum = 0.0;
        for (NumberEntity number : numbers) {
            sum += number.getValue();
        }
        return sum / numbers.size();
    }

    @GetMapping("numbers/max")
    public Long getMax() {
        List<NumberEntity> numbers = numberEntityRepository.findAll();
        if (numbers.isEmpty()) {
            return Long.MIN_VALUE;
        }
        double max = numbers.get(0).getValue();
        for (NumberEntity number : numbers) {
            if (number.getValue() > max) {
                max = number.getValue();
            }
        }
        return (long) max;
    }

    @GetMapping("numbers/moving-average")
    public Double[] getMovingAverage() {
        List<NumberEntity> numbers = numberEntityRepository.findAll();
        if (numbers.size() < 3) {
            return new Double[0];
        }
        Double[] movingAverages = new Double[numbers.size() - 2];
        for (int i = 0; i < movingAverages.length; i++) {
            double currentValue = numbers.get(i).getValue();
            double nextValue = numbers.get(i + 1).getValue();
            double nextNextValue = numbers.get(i + 2).getValue();
            movingAverages[i] = (currentValue + nextValue + nextNextValue) / 3.0;
        }
        return movingAverages;
    }
}