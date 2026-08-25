package com.smartwarehouse.controller;

import com.smartwarehouse.dto.WarehouseDTO;
import com.smartwarehouse.dto.response.ApiResponse;
import com.smartwarehouse.security.SecurityUtils;
import com.smartwarehouse.service.WarehouseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {

    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO', 'NHAN_VIEN_KHO')")
    public ResponseEntity<ApiResponse<List<WarehouseDTO>>> getAllWarehouses() {
        Integer filterWarehouseId = SecurityUtils.getCurrentUserWarehouseId();
        return ResponseEntity.ok(ApiResponse.success("Success", warehouseService.getAllWarehouses(filterWarehouseId)));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO', 'NHAN_VIEN_KHO')")
    public ResponseEntity<ApiResponse<WarehouseDTO>> getWarehouseById(@PathVariable Integer id) {
        // Here we could also enforce that THU_KHO can only fetch their own warehouse.
        // For now, SecurityUtils filters the list view, detail view relies on client using the ID from list.
        return ResponseEntity.ok(ApiResponse.success("Success", warehouseService.getWarehouseById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<WarehouseDTO>> createWarehouse(@RequestBody WarehouseDTO warehouseDTO) {
        return ResponseEntity.ok(ApiResponse.success("Warehouse created successfully", warehouseService.createWarehouse(warehouseDTO)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<WarehouseDTO>> updateWarehouse(@PathVariable Integer id, @RequestBody WarehouseDTO warehouseDTO) {
        return ResponseEntity.ok(ApiResponse.success("Warehouse updated successfully", warehouseService.updateWarehouse(id, warehouseDTO)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteWarehouse(@PathVariable Integer id) {
        warehouseService.deleteWarehouse(id);
        return ResponseEntity.ok(ApiResponse.success("Warehouse deleted successfully", null));
    }
}

