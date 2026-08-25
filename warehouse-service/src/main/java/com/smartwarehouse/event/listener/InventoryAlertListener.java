package com.smartwarehouse.event.listener;

import com.smartwarehouse.entity.InventoryAlert;
import com.smartwarehouse.event.InventoryLowStockEvent;
import com.smartwarehouse.repository.InventoryAlertRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class InventoryAlertListener {

    private final InventoryAlertRepository inventoryAlertRepository;

    public InventoryAlertListener(InventoryAlertRepository inventoryAlertRepository) {
        this.inventoryAlertRepository = inventoryAlertRepository;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleInventoryLowStockEvent(InventoryLowStockEvent event) {
        InventoryAlert alert = InventoryAlert.builder()
                .product(event.getProduct())
                .warehouse(event.getWarehouse())
                .currentQuantity(event.getCurrentQuantity())
                .minThreshold(event.getMinThreshold())
                .alertMessage(String.format("Product %s is below minimum threshold %d (Current: %d)",
                        event.getProduct().getProductName(), event.getMinThreshold(), event.getCurrentQuantity()))
                .isResolved(false)
                .build();

        inventoryAlertRepository.save(alert);
        System.out.println("Generated InventoryAlert for Product ID: " + event.getProduct().getProductId());
    }
}
