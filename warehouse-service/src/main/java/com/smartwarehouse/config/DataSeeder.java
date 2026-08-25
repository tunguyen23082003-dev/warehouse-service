package com.smartwarehouse.config;

import com.smartwarehouse.entity.Role;
import com.smartwarehouse.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final com.smartwarehouse.repository.UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public DataSeeder(RoleRepository roleRepository, 
                      com.smartwarehouse.repository.UserRepository userRepository,
                      org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        List<String> requiredRoles = Arrays.asList("ADMIN", "THU_KHO", "NHAN_VIEN_KHO");

        for (String roleName : requiredRoles) {
            if (roleRepository.findByRoleName(roleName).isEmpty()) {
                Role role = Role.builder()
                        .roleName(roleName)
                        .description("Quyền: " + roleName)
                        .build();
                roleRepository.save(role);
                System.out.println("Seeded role: " + roleName);
            }
        }

        // Force seed or update admin user
        com.smartwarehouse.entity.User admin = userRepository.findByUsername("admin@warehouse.com").orElse(null);
        if (admin == null) {
            // Check if there is a user with that email
            com.smartwarehouse.entity.User existingByEmail = null;
            try {
                // If we don't have findByEmail, we can't easily fetch it, let's just catch the exception
                // Actually we can just update ALL users with ROLE_ADMIN to have password 123456
                List<com.smartwarehouse.entity.User> allUsers = userRepository.findAll();
                for (com.smartwarehouse.entity.User u : allUsers) {
                    if ("admin@warehouse.com".equals(u.getEmail()) || "admin@warehouse.com".equals(u.getUsername())) {
                        u.setPassword(passwordEncoder.encode("123456"));
                        userRepository.save(u);
                        System.out.println("Updated existing admin user password to: 123456");
                        admin = u;
                        break;
                    }
                }
            } catch (Exception e) {}
            
            if (admin == null) {
                Role adminRole = roleRepository.findByRoleName("ADMIN").orElseThrow();
                admin = com.smartwarehouse.entity.User.builder()
                        .username("admin@warehouse.com")
                        .email("admin@warehouse.com")
                        .password(passwordEncoder.encode("123456"))
                        .fullName("Administrator")
                        .status(com.smartwarehouse.entity.User.UserStatus.ACTIVE)
                        .role(adminRole)
                        .build();
                userRepository.save(admin);
                System.out.println("Seeded admin user: admin@warehouse.com / 123456");
            }
        } else {
            // Force update password to make sure it's 123456 bcrypted
            admin.setPassword(passwordEncoder.encode("123456"));
            userRepository.save(admin);
            System.out.println("Updated admin user password to: 123456");
        }

        // Seed manager user
        com.smartwarehouse.entity.User manager = userRepository.findByUsername("manager1@warehouse.com").orElse(null);
        if (manager == null) {
            try {
                List<com.smartwarehouse.entity.User> allUsers = userRepository.findAll();
                for (com.smartwarehouse.entity.User u : allUsers) {
                    if ("manager1@warehouse.com".equals(u.getEmail()) || "manager1@warehouse.com".equals(u.getUsername())) {
                        u.setPassword(passwordEncoder.encode("123456"));
                        userRepository.save(u);
                        manager = u;
                        break;
                    }
                }
            } catch (Exception e) {}

            if (manager == null) {
                Role managerRole = roleRepository.findByRoleName("THU_KHO").orElseThrow();
                manager = com.smartwarehouse.entity.User.builder()
                        .username("manager1@warehouse.com")
                        .email("manager1@warehouse.com")
                        .password(passwordEncoder.encode("123456"))
                        .fullName("Manager 1")
                        .status(com.smartwarehouse.entity.User.UserStatus.ACTIVE)
                        .role(managerRole)
                        .build();
                userRepository.save(manager);
                System.out.println("Seeded manager user: manager1@warehouse.com / 123456");
            }
        } else {
            manager.setPassword(passwordEncoder.encode("123456"));
            userRepository.save(manager);
        }
    }
}
