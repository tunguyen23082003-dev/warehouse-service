package com.smartwarehouse.service.strategy;

import com.smartwarehouse.entity.StockOrder;

public interface StockOrderAction {
    void execute(StockOrder order);
}
