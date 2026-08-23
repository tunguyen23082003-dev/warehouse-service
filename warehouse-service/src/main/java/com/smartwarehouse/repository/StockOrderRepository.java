package com.smartwarehouse.repository;

import com.smartwarehouse.entity.StockOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockOrderRepository extends JpaRepository<StockOrder, Long> {
    Optional<StockOrder> findByOrderCode(String orderCode);
    List<StockOrder> findByStatus(String status);
}
