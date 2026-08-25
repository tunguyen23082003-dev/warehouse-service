package com.smartwarehouse.dto;

import com.smartwarehouse.entity.User.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String fullName;
    private String phone;
    private UserStatus status;
    private Integer roleId;
    private String roleName;
    private Integer warehouseId;
    private String warehouseName;
}

