package com.smartwarehouse.dto.request;

import com.smartwarehouse.entity.User.UserStatus;
import lombok.Data;

@Data
public class UserCreateRequest {
    private String name; // mapped to fullName
    private String username; // can be derived from email or name if not provided
    private String email;
    private String password;
    private String role; // role name
    private Integer warehouseId;
    private UserStatus status;
}

