package com.smartwarehouse.mapper;

import com.smartwarehouse.dto.SupplierDTO;
import com.smartwarehouse.entity.Supplier;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    SupplierDTO toDto(Supplier supplier);
    Supplier toEntity(SupplierDTO supplierDTO);
    List<SupplierDTO> toDtoList(List<Supplier> suppliers);
}

