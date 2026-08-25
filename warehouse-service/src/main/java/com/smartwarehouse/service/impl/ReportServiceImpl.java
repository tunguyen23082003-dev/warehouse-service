package com.smartwarehouse.service.impl;

import com.smartwarehouse.dto.response.ImportExportStatDTO;
import com.smartwarehouse.dto.response.TopProductDTO;
import com.smartwarehouse.service.ReportService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Override
    public List<TopProductDTO> getTopProducts() {
        return Arrays.asList(
                new TopProductDTO(1L, "Laptop Dell XPS", "DELL-XPS", 500L),
                new TopProductDTO(2L, "MacBook Pro M3", "MAC-M3", 450L),
                new TopProductDTO(3L, "Bàn phím cơ Keychron", "KEY-K8", 300L)
        );
    }

    @Override
    public List<ImportExportStatDTO> getImportExportStats(Integer warehouseId, String from, String to) {
        return Arrays.asList(
                new ImportExportStatDTO("T2", 120L, 80L),
                new ImportExportStatDTO("T3", 150L, 90L),
                new ImportExportStatDTO("T4", 180L, 110L),
                new ImportExportStatDTO("T5", 130L, 150L),
                new ImportExportStatDTO("T6", 200L, 170L),
                new ImportExportStatDTO("T7", 250L, 200L),
                new ImportExportStatDTO("CN", 90L, 60L)
        );
    }
}

