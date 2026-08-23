package com.smartwarehouse.service;

import com.smartwarehouse.entity.Warehouse;
import java.util.List;

public interface WarehouseService {
    List<Warehouse> getAllWarehouses();
    Warehouse getWarehouseById(Integer id);
    Warehouse createWarehouse(Warehouse warehouse);
}
