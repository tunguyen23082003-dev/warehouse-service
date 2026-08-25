package com.smartwarehouse.service.impl;

import com.smartwarehouse.dto.UserDTO;
import com.smartwarehouse.dto.request.UserCreateRequest;
import com.smartwarehouse.entity.Role;
import com.smartwarehouse.entity.User;
import com.smartwarehouse.entity.Warehouse;
import com.smartwarehouse.exception.ResourceNotFoundException;
import com.smartwarehouse.mapper.UserMapper;
import com.smartwarehouse.repository.RoleRepository;
import com.smartwarehouse.repository.UserRepository;
import com.smartwarehouse.repository.WarehouseRepository;
import com.smartwarehouse.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final WarehouseRepository warehouseRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           WarehouseRepository warehouseRepository, UserMapper userMapper,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.warehouseRepository = warehouseRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userMapper.toDtoList(userRepository.findAll());
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserDTO createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getEmail()) || userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email/Username already exists");
        }

        Role role = roleRepository.findByRoleName(request.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        Warehouse warehouse = null;
        if (request.getWarehouseId() != null) {
            warehouse = warehouseRepository.findById(request.getWarehouseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
        }

        User user = User.builder()
                .username(request.getEmail()) // use email as username
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getName())
                .status(request.getStatus() != null ? request.getStatus() : User.UserStatus.ACTIVE)
                .role(role)
                .warehouse(warehouse)
                .build();

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserDTO updateUser(Long id, UserCreateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFullName(request.getName());
        if (request.getStatus() != null) {
            user.setStatus(request.getStatus());
        }

        if (request.getRole() != null) {
            Role role = roleRepository.findByRoleName(request.getRole())
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
            user.setRole(role);
        }

        if (request.getWarehouseId() != null) {
            Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
            user.setWarehouse(warehouse);
        } else if ("ADMIN".equals(request.getRole())) {
            user.setWarehouse(null);
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }
}
