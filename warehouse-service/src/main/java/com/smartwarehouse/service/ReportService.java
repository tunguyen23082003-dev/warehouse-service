package com.smartwarehouse.service;

import com.smartwarehouse.dto.response.ImportExportStatDTO;
import com.smartwarehouse.dto.response.TopProductDTO;
import java.util.List;

public interface ReportService {
    List<TopProductDTO> getTopProducts();
    List<ImportExportStatDTO> getImportExportStats(Integer warehouseId, String from, String to);
}

