package com.smartwarehouse.controller;

import com.smartwarehouse.dto.response.ApiResponse;
import com.smartwarehouse.repository.InventoryAlertRepository;
import com.smartwarehouse.repository.ProductRepository;
import com.smartwarehouse.repository.UserRepository;
import com.smartwarehouse.repository.WarehouseRepository;
import com.smartwarehouse.repository.InventoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final InventoryAlertRepository alertRepository;
    private final InventoryRepository inventoryRepository;

    public DashboardController(WarehouseRepository warehouseRepository,
                               ProductRepository productRepository,
                               UserRepository userRepository,
                               InventoryAlertRepository alertRepository,
                               InventoryRepository inventoryRepository) {
        this.warehouseRepository = warehouseRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.alertRepository = alertRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @GetMapping("/overview")
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO', 'NHAN_VIEN_KHO')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getOverview() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalWarehouses", warehouseRepository.count());
        stats.put("totalProducts", productRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalAlerts", alertRepository.count());

        // Build data for BarChart
        List<Map<String, Object>> chartData = warehouseRepository.findAll().stream().map(wh -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", wh.getWarehouseName());
            Integer totalQuantity = inventoryRepository.findByWarehouseWarehouseId(wh.getWarehouseId())
                    .stream()
                    .mapToInt(inv -> inv.getQuantity())
                    .sum();
            map.put("quantity", totalQuantity);
            return map;
        }).collect(Collectors.toList());

        stats.put("chartData", chartData);

        return ResponseEntity.ok(ApiResponse.success("Success", stats));
    }
}

