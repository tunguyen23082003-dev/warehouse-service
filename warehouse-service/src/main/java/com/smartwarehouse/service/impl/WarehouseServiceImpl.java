package com.smartwarehouse.service.impl;

import com.smartwarehouse.dto.WarehouseDTO;
import com.smartwarehouse.entity.Warehouse;
import com.smartwarehouse.exception.ResourceNotFoundException;
import com.smartwarehouse.mapper.WarehouseMapper;
import com.smartwarehouse.repository.WarehouseRepository;
import com.smartwarehouse.service.WarehouseService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final WarehouseMapper warehouseMapper;

    public WarehouseServiceImpl(WarehouseRepository warehouseRepository, WarehouseMapper warehouseMapper) {
        this.warehouseRepository = warehouseRepository;
        this.warehouseMapper = warehouseMapper;
    }

    @Override
    public List<WarehouseDTO> getAllWarehouses(Integer filterWarehouseId) {
        if (filterWarehouseId != null) {
            Warehouse warehouse = warehouseRepository.findById(filterWarehouseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
            return warehouseMapper.toDtoList(Collections.singletonList(warehouse));
        }
        return warehouseMapper.toDtoList(warehouseRepository.findAll());
    }

    @Override
    public WarehouseDTO getWarehouseById(Integer id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        return warehouseMapper.toDto(warehouse);
    }

    @Override
    public WarehouseDTO createWarehouse(WarehouseDTO warehouseDTO) {
        Warehouse warehouse = warehouseMapper.toEntity(warehouseDTO);
        return warehouseMapper.toDto(warehouseRepository.save(warehouse));
    }

    @Override
    public WarehouseDTO updateWarehouse(Integer id, WarehouseDTO warehouseDTO) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));

        warehouse.setWarehouseCode(warehouseDTO.getWarehouseCode());
        warehouse.setWarehouseName(warehouseDTO.getWarehouseName());
        warehouse.setLocation(warehouseDTO.getLocation());
        warehouse.setCapacity(warehouseDTO.getCapacity());

        return warehouseMapper.toDto(warehouseRepository.save(warehouse));
    }

    @Override
    public void deleteWarehouse(Integer id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        warehouseRepository.delete(warehouse);
    }
}
