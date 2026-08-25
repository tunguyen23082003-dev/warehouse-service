package com.smartwarehouse.event;

import com.smartwarehouse.entity.Product;
import com.smartwarehouse.entity.Warehouse;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class InventoryLowStockEvent extends ApplicationEvent {

    private final Product product;
    private final Warehouse warehouse;
    private final Integer currentQuantity;
    private final Integer minThreshold;

    public InventoryLowStockEvent(Object source, Product product, Warehouse warehouse, Integer currentQuantity, Integer minThreshold) {
        super(source);
        this.product = product;
        this.warehouse = warehouse;
        this.currentQuantity = currentQuantity;
        this.minThreshold = minThreshold;
    }
}
