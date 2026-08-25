package com.smartwarehouse.service;

import com.smartwarehouse.dto.WarehouseDTO;
import java.util.List;

public interface WarehouseService {
    List<WarehouseDTO> getAllWarehouses(Integer filterWarehouseId);
    WarehouseDTO getWarehouseById(Integer id);
    WarehouseDTO createWarehouse(WarehouseDTO warehouseDTO);
    WarehouseDTO updateWarehouse(Integer id, WarehouseDTO warehouseDTO);
    void deleteWarehouse(Integer id);
}
