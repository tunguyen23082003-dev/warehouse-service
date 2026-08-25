package com.smartwarehouse.security;

import com.smartwarehouse.entity.User;
import com.smartwarehouse.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseGet(() -> userRepository.findAll().stream()
                        .filter(u -> username.equals(u.getEmail()))
                        .findFirst()
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with username/email: " + username)));

        String roleName = user.getRole().getRoleName();
        String authorityName = roleName.startsWith("ROLE_") ? roleName : "ROLE_" + roleName;
        GrantedAuthority authority = new SimpleGrantedAuthority(authorityName);
        
        Integer warehouseId = null;
        if (user.getWarehouse() != null) {
            warehouseId = user.getWarehouse().getWarehouseId();
        }

        return new CustomUserDetails(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(authority),
                user.getUserId(),
                warehouseId,
                roleName
        );
    }
}
