package ee.martin.veebipood.controller;


import ee.martin.veebipood.entity.Order;
import ee.martin.veebipood.entity.Product;
import ee.martin.veebipood.repository.OrderRepository;
import ee.martin.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class OrderController {
    @Autowired
    OrderRepository orderRepository;

    @GetMapping("orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    // TODO: ei tagasta kõiki tellimusi!
    //TODO: peab võtma front-endist ainult id, mitte usaldama front-endist tulevaid hindasid
    @PostMapping("orders")
    public List<Order> addOrder(@RequestBody Order order){ //praegu on fromt-endist tulevad toodete hinnad (kerge kuritarvitada) :(
        order.setDate(new Date());
        double sum = 0;
        for (Product p: order.getProducts() ) {
            //sum = sum + p.getPrice();
            sum += p.getPrice();
        }
        order.setTotalSum(sum);
        orderRepository.save(order);
        return orderRepository.findAll();
    }
}