package com.smartwarehouse.controller;

import com.smartwarehouse.dto.response.ApiResponse;
import com.smartwarehouse.dto.response.ImportExportStatDTO;
import com.smartwarehouse.dto.response.TopProductDTO;
import com.smartwarehouse.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@PreAuthorize("hasAnyRole('ADMIN', 'THU_KHO')")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/top-products")
    public ResponseEntity<ApiResponse<List<TopProductDTO>>> getTopProducts() {
        return ResponseEntity.ok(ApiResponse.success("Success", reportService.getTopProducts()));
    }

    @GetMapping("/import-export")
    public ResponseEntity<ApiResponse<List<ImportExportStatDTO>>> getImportExportStats(
            @RequestParam(required = false) Integer warehouseId,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to) {
        return ResponseEntity.ok(ApiResponse.success("Success", reportService.getImportExportStats(warehouseId, from, to)));
    }
}

