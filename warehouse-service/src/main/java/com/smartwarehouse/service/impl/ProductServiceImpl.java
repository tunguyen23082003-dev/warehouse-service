package com.smartwarehouse.service.impl;

import com.smartwarehouse.dto.ProductDTO;
import com.smartwarehouse.entity.Category;
import com.smartwarehouse.entity.Product;
import com.smartwarehouse.entity.Supplier;
import com.smartwarehouse.repository.CategoryRepository;
import com.smartwarehouse.repository.ProductRepository;
import com.smartwarehouse.repository.SupplierRepository;
import com.smartwarehouse.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    public Product createProduct(ProductDTO productDTO) {
        Category category = null;
        if (productDTO.getCategoryId() != null) {
            category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDTO.getCategoryId()));
        }

        Supplier supplier = null;
        if (productDTO.getSupplierId() != null) {
            supplier = supplierRepository.findById(productDTO.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + productDTO.getSupplierId()));
        }

        Product product = Product.builder()
                .productCode(productDTO.getProductCode())
                .productName(productDTO.getProductName())
                .category(category)
                .supplier(supplier)
                .unit(productDTO.getUnit())
                .price(productDTO.getPrice())
                .description(productDTO.getDescription())
                .build();

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = getProductById(id);

        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existingProduct.setCategory(category);
        }

        if (productDTO.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(productDTO.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            existingProduct.setSupplier(supplier);
        }

        existingProduct.setProductName(productDTO.getProductName());
        existingProduct.setUnit(productDTO.getUnit());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setDescription(productDTO.getDescription());

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product existingProduct = getProductById(id);
        productRepository.delete(existingProduct);
    }
}
