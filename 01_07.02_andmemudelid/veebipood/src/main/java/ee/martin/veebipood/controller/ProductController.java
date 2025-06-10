package ee.martin.veebipood.controller;

import ee.martin.veebipood.entity.Product;
import ee.martin.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    //localhost:8080/products
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll(); //SELECT * FROM   extends JpaRepository<Product>
    }

    @PostMapping("products") //POSTMAN rakendus
    public List<Product> addProduct(@RequestBody Product product) {
        if (product.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (product.getPrice() <= 0) {
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product); //INSERT INTO products
        return productRepository.findAll();
    }
    //DELETE localhost:8080/products/(id)
    @DeleteMapping("products/{id}")
    public List<Product> deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
        return productRepository.findAll();
    }
    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product product) {
        if (product.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (product.getPrice() <= 0) {
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }
    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }


    //kui on 2 või enam parameetrit, peaks kasutama RequestParam! Kui on 1 siis on ilusam kasutada PathVariable!
    // localhost/8080/products?id=4&field=name&value=aura
    @PatchMapping("products")
    public List<Product> editProduct(@RequestParam Long id, String field, String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Product product = productRepository.findById(id).orElseThrow();
        switch (field) {
            case "name" ->  product.setName(value);
            case "price" -> {
                if (Double.parseDouble(value) <= 0) {
                    throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
                }
                product.setPrice(Double.parseDouble(value));
            }
            case "image" ->  product.setImage(value);
            case "active" ->  product.setActive(Boolean.parseBoolean(value));
        }
/*        if (field.equals("name")) {           on kõike võimalik teha if ja else if-idega kui switch on kompaktsem
            product.setName(value);
        }*/
        productRepository.save(product);
        return productRepository.findAll();
    }

    // localhost:8080/category-products?categoryId=1
/*   @GetMapping("/category-products")
    public List<Product> getCategoryProducts(@RequestParam long categoryId) {
        List<Product> products = productRepository.findAll();
        List<Product> filteredProducts = new ArrayList<>(); //tühi list
        for (Product p : products) {
            // == --> kontrollib, kas kas parem ja vasak pool on identsed.
            // .equals() --> kontrollib, kas vasaku ja parema väärtus on identsed.
            if(p.getCategory().getId().equals(categoryId)){
                filteredProducts.add(p);
            }
        }
        return filteredProducts;
    }*/

    //http://localhost:8080/category-products?categoryId=1&page=0&size=2&sort=price,desc

    @GetMapping("/category-products")
    public Page<Product> getCategoryProducts(@RequestParam Long categoryId, Pageable pageable) {
        if (categoryId == -1) {
            return productRepository.findAll(pageable);
        }
        return productRepository.findByCategory_Id(categoryId, pageable);
    }
}

//1xx -> informatiivsed
//2xx -> Edukad -- 201(created)
//3xx -> suunamine
//4xx -> päringu tegija veaga, client error, front-end viga
//400 - üldine viga
//401, 403 - audentimisega seotud viga
//402 - maksetega seotud viga
//404 - api endpoint on vale
//405 - method not allowed
//415 - sisu tüüp on vale
//5xx -> back-end viga