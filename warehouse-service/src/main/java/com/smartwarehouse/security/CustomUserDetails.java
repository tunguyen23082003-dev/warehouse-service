package com.smartwarehouse.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class CustomUserDetails extends User {

    private final Long userId;
    private final Integer warehouseId;
    private final String roleName;

    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities,
                             Long userId, Integer warehouseId, String roleName) {
        super(username, password, authorities);
        this.userId = userId;
        this.warehouseId = warehouseId;
        this.roleName = roleName;
    }
}
