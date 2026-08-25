package com.smartwarehouse.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String phone;
    private String roleName; // E.g., "THU_KHO" or "NHAN_VIEN_KHO"
    private Integer warehouseId;
}
