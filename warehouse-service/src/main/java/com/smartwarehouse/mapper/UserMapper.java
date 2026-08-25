package com.smartwarehouse.mapper;

import com.smartwarehouse.dto.UserDTO;
import com.smartwarehouse.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "role.roleId", target = "roleId")
    @Mapping(source = "role.roleName", target = "roleName")
    @Mapping(source = "warehouse.warehouseId", target = "warehouseId")
    @Mapping(source = "warehouse.warehouseName", target = "warehouseName")
    UserDTO toDto(User user);
    
    // We usually don't map from DTO directly for complex relations like Role and Warehouse in generic mapping
    // User toEntity(UserDTO userDTO);
    
    List<UserDTO> toDtoList(List<User> users);
}

