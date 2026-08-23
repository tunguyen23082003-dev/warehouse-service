package com.smartwarehouse.service;

import com.smartwarehouse.dto.ProductDTO;
import com.smartwarehouse.entity.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product createProduct(ProductDTO productDTO);
    Product updateProduct(Long id, ProductDTO productDTO);
    void deleteProduct(Long id);
}
