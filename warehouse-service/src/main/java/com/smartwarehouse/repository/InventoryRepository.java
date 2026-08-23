package com.smartwarehouse.repository;

import com.smartwarehouse.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByWarehouseWarehouseIdAndProductProductId(Integer warehouseId, Long productId);
    List<Inventory> findByWarehouseWarehouseId(Integer warehouseId);
}   

