package com.smartwarehouse.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static CustomUserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            return (CustomUserDetails) authentication.getPrincipal();
        }
        return null;
    }

    public static Integer getCurrentUserWarehouseId() {
        CustomUserDetails userDetails = getCurrentUser();
        if (userDetails != null) {
            // ADMIN sees all, so return null
            if ("ADMIN".equals(userDetails.getRoleName())) {
                return null;
            }
            return userDetails.getWarehouseId();
        }
        return null;
    }
}
