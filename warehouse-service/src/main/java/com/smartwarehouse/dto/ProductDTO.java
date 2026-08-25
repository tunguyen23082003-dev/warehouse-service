package com.smartwarehouse.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private String productCode;
    private String productName;
    private Integer categoryId;
    private Long supplierId;
    private String unit;
    private BigDecimal basePrice;
    private Integer minThreshold;
    private String status;
    private String description;
}
