package com.smartwarehouse.controller;

import com.smartwarehouse.dto.ProductDTO;
import com.smartwarehouse.entity.Product;
import com.smartwarehouse.service.ProductService;
import com.smartwarehouse.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO', 'NHAN_VIEN_KHO')")
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
        return ResponseEntity.ok(ApiResponse.success("Success", productService.getAllProducts()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO', 'NHAN_VIEN_KHO')")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Success", productService.getProductById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO')")
    public ResponseEntity<ApiResponse<Product>> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(ApiResponse.success("Product created successfully", productService.createProduct(productDTO)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO')")
    public ResponseEntity<ApiResponse<Product>> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", productService.updateProduct(id, productDTO)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO')")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }
}
