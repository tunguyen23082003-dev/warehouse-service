package com.smartwarehouse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDTO {
    private Long supplierId;
    private String supplierCode;
    private String supplierName;
    private String email;
    private String phone;
    private String address;
}
