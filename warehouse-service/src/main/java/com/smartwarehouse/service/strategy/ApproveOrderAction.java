package com.smartwarehouse.service.strategy;

import com.smartwarehouse.entity.StockOrder;
import com.smartwarehouse.exception.InvalidOrderStateException;
import org.springframework.stereotype.Component;

@Component("approveOrderAction")
public class ApproveOrderAction implements StockOrderAction {

    @Override
    public void execute(StockOrder order) {
        if (order.getStatus() != StockOrder.OrderStatus.PENDING) {
            throw new InvalidOrderStateException("Only PENDING orders can be approved.");
        }
        order.setStatus(StockOrder.OrderStatus.APPROVED);
    }
}

