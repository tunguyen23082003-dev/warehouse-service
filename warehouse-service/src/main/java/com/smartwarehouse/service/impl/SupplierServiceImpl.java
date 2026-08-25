package com.smartwarehouse.service.impl;

import com.smartwarehouse.dto.SupplierDTO;
import com.smartwarehouse.entity.Supplier;
import com.smartwarehouse.exception.ResourceNotFoundException;
import com.smartwarehouse.mapper.SupplierMapper;
import com.smartwarehouse.repository.SupplierRepository;
import com.smartwarehouse.service.SupplierService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    public SupplierServiceImpl(SupplierRepository supplierRepository, SupplierMapper supplierMapper) {
        this.supplierRepository = supplierRepository;
        this.supplierMapper = supplierMapper;
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return supplierMapper.toDtoList(supplierRepository.findAll());
    }

    @Override
    public SupplierDTO getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
        return supplierMapper.toDto(supplier);
    }

    @Override
    public SupplierDTO createSupplier(SupplierDTO supplierDTO) {
        Supplier supplier = supplierMapper.toEntity(supplierDTO);
        return supplierMapper.toDto(supplierRepository.save(supplier));
    }

    @Override
    public SupplierDTO updateSupplier(Long id, SupplierDTO supplierDTO) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));

        supplier.setSupplierCode(supplierDTO.getSupplierCode());
        supplier.setSupplierName(supplierDTO.getSupplierName());
        supplier.setEmail(supplierDTO.getEmail());
        supplier.setPhone(supplierDTO.getPhone());
        supplier.setAddress(supplierDTO.getAddress());

        return supplierMapper.toDto(supplierRepository.save(supplier));
    }

    @Override
    public void deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
        supplierRepository.delete(supplier);
    }
}
