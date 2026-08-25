package com.smartwarehouse.mapper;

import com.smartwarehouse.dto.WarehouseDTO;
import com.smartwarehouse.entity.Warehouse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WarehouseMapper {
    WarehouseDTO toDto(Warehouse warehouse);
    Warehouse toEntity(WarehouseDTO warehouseDTO);
    List<WarehouseDTO> toDtoList(List<Warehouse> warehouses);
}

