package com.smartwarehouse.service.impl;

import com.smartwarehouse.dto.request.LoginRequest;
import com.smartwarehouse.dto.request.RegisterRequest;
import com.smartwarehouse.dto.response.AuthResponse;
import com.smartwarehouse.entity.Role;
import com.smartwarehouse.entity.User;
import com.smartwarehouse.entity.Warehouse;
import com.smartwarehouse.exception.BusinessException;
import com.smartwarehouse.exception.DuplicateResourceException;
import com.smartwarehouse.exception.ResourceNotFoundException;
import com.smartwarehouse.repository.RoleRepository;
import com.smartwarehouse.repository.UserRepository;
import com.smartwarehouse.repository.WarehouseRepository;
import com.smartwarehouse.security.JwtTokenProvider;
import com.smartwarehouse.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final WarehouseRepository warehouseRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           JwtTokenProvider tokenProvider,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           WarehouseRepository warehouseRepository,
                           PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.warehouseRepository = warehouseRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseGet(() -> userRepository.findAll().stream()
                        .filter(u -> loginRequest.getUsername().equals(u.getEmail()))
                        .findFirst()
                        .orElseThrow(() -> new ResourceNotFoundException("User not found")));

        return AuthResponse.builder()
                .token(jwt)
                .username(user.getUsername())
                .role(user.getRole().getRoleName())
                .warehouseId(user.getWarehouse() != null ? user.getWarehouse().getWarehouseId() : null)
                .build();
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new DuplicateResourceException("Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new DuplicateResourceException("Email is already taken!");
        }

        // Get Role (Default to NHAN_VIEN_KHO if not provided)
        String roleName = registerRequest.getRoleName() != null ? registerRequest.getRoleName() : "NHAN_VIEN_KHO";
        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));

        // Get Warehouse if provided
        Warehouse warehouse = null;
        if (registerRequest.getWarehouseId() != null) {
            warehouse = warehouseRepository.findById(registerRequest.getWarehouseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
        }

        User user = User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullName())
                .email(registerRequest.getEmail())
                .phone(registerRequest.getPhone())
                .role(role)
                .warehouse(warehouse)
                .status(User.UserStatus.ACTIVE)
                .build();

        userRepository.save(user);

        // Auto login after registration
        return login(new LoginRequest(registerRequest.getUsername(), registerRequest.getPassword()));
    }
}

