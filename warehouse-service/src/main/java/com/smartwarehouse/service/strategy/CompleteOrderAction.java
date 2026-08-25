package com.smartwarehouse.service.strategy;

import com.smartwarehouse.entity.Inventory;
import com.smartwarehouse.entity.OrderDetail;
import com.smartwarehouse.entity.StockOrder;
import com.smartwarehouse.event.InventoryLowStockEvent;
import com.smartwarehouse.exception.InvalidOrderStateException;
import com.smartwarehouse.repository.InventoryRepository;
import com.smartwarehouse.repository.OrderDetailRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component("completeOrderAction")
public class CompleteOrderAction implements StockOrderAction {

    private final OrderDetailRepository orderDetailRepository;
    private final InventoryRepository inventoryRepository;
    private final ApplicationEventPublisher eventPublisher;

    public CompleteOrderAction(OrderDetailRepository orderDetailRepository,
                               InventoryRepository inventoryRepository,
                               ApplicationEventPublisher eventPublisher) {
        this.orderDetailRepository = orderDetailRepository;
        this.inventoryRepository = inventoryRepository;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public void execute(StockOrder order) {
        if (order.getStatus() != StockOrder.OrderStatus.APPROVED) {
            throw new InvalidOrderStateException("Only APPROVED orders can be completed.");
        }

        List<OrderDetail> details = orderDetailRepository.findByOrderOrderId(order.getOrderId());
        Integer warehouseId = order.getWarehouse().getWarehouseId();

        for (OrderDetail detail : details) {
            Long productId = detail.getProduct().getProductId();
            Integer quantityChange = detail.getQuantity();

            Optional<Inventory> optionalInventory = inventoryRepository.findByWarehouseWarehouseIdAndProductProductId(warehouseId, productId);

            Inventory inventory;
            if (optionalInventory.isPresent()) {
                inventory = optionalInventory.get();
                if (order.getOrderType() == StockOrder.OrderType.IMPORT) {
                    inventory.setQuantity(inventory.getQuantity() + quantityChange);
                } else if (order.getOrderType() == StockOrder.OrderType.EXPORT) {
                    if (inventory.getQuantity() < quantityChange) {
                        throw new InvalidOrderStateException("Not enough inventory for product ID: " + productId);
                    }
                    inventory.setQuantity(inventory.getQuantity() - quantityChange);
                }
            } else {
                if (order.getOrderType() == StockOrder.OrderType.EXPORT) {
                    throw new InvalidOrderStateException("Product not found in inventory for EXPORT: " + productId);
                }
                inventory = Inventory.builder()
                        .warehouse(order.getWarehouse())
                        .product(detail.getProduct())
                        .quantity(quantityChange)
                        .binLocation("DEFAULT")
                        .build();
            }

            inventoryRepository.save(inventory);

            // Check if quantity falls below minThreshold
            Integer minThreshold = detail.getProduct().getMinThreshold();
            if (minThreshold != null && inventory.getQuantity() < minThreshold) {
                // Publish Low Stock Event
                eventPublisher.publishEvent(new InventoryLowStockEvent(
                        this,
                        detail.getProduct(),
                        order.getWarehouse(),
                        inventory.getQuantity(),
                        minThreshold
                ));
            }
        }

        order.setStatus(StockOrder.OrderStatus.COMPLETED);
    }
}

