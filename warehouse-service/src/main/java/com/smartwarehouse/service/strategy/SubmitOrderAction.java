package com.smartwarehouse.service.strategy;

import com.smartwarehouse.entity.StockOrder;
import com.smartwarehouse.exception.InvalidOrderStateException;
import org.springframework.stereotype.Component;

@Component("submitOrderAction")
public class SubmitOrderAction implements StockOrderAction {

    @Override
    public void execute(StockOrder order) {
        if (order.getStatus() != null && order.getStatus() != StockOrder.OrderStatus.PENDING) {
            throw new InvalidOrderStateException("Order must be in a state that allows submission.");
        }
        order.setStatus(StockOrder.OrderStatus.PENDING);
    }
}
