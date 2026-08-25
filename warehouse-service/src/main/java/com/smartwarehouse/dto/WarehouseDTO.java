package com.smartwarehouse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseDTO {
    private Integer warehouseId;
    private String warehouseCode;
    private String warehouseName;
    private String location;
    private Integer capacity;
}

