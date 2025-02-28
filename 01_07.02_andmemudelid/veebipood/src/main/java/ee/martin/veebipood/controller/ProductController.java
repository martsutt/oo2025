package ee.martin.veebipood.controller;

import ee.martin.veebipood.entity.Product;
import ee.martin.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    // localhost: 8080/products
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll(); // SELECT * from extends JpaRepository<Product>
    }

    @PostMapping("products") // POSTMAN rakendus
    public List<Product> addProduct(@RequestBody Product product) {
        if(product.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if(product.getPrice() <= 0) {
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product); // INSERT INTO products
        return productRepository.findAll();
    }

    // DELETE localhost:8080/products/1234
    @DeleteMapping("products/{id}")
    public List<Product> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return productRepository.findAll(); // SELECT * from extends JpaRepository<Product>
    }


    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product product) {
        if(product.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if(product.getPrice() <= 0) {
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product); // INSERT INTO products
        return productRepository.findAll();
    }


    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }


    // kui on 2 või enam panameetrit peaks kasutama RequestParam
    // kui on 1 on ilusam kasutada @PathVariable
    // kui @PatchMapping-us kasutada @PathVariable-i siis jääks selgitus natuke nõrgaks:  localhost:8080/products/4/name/Aura
    @PatchMapping("products") // PATCH localhost:8080/products?id=4&field=name&value=Aura
    public List<Product> editProductValue(@RequestParam Long id, String field, String value) {
        if(id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Product product = productRepository.findById(id).orElseThrow(); // see siin ja all eeldab seda et ma tahan kõiki muid väärtusi samaks jätta, kui ma ainult ühte väärtust muudan
        switch (field) { // switch on lihtsustatud IF ELSE
            case "name" -> product.setName(value);
            case "price" -> {
                if (Double.parseDouble(value) <= 0) {
                    throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
                }
                product.setPrice(Double.parseDouble(value));
            }
            case "image" -> product.setImage(value);
            case "active" -> product.setActive(Boolean.parseBoolean(value));
        }

        // SIIN SAMA ASI TEHTUD IF-ide JA ELSE-idega SWITCH-i asemel

//        if (field.equals("name")) {
//            product.setName(value);
//        } else if (field.equals("price")) {
//            product.setPrice(Double.parseDouble(value));
//        } else if (field.equals("image")) {
//            product.setImage(value);
//        } else if (field.equals("active")) {
//            product.setActive(Boolean.parseBoolean(value));
//        }

        // String ei ole primitiivne väärtus. Seega ei saa tema väärtusi kontrollida võrdusmärgiga (peame kasutama .equals)


        productRepository.save(product); // INSERT INTO products
        return productRepository.findAll();
    }
}
