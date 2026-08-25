package com.smartwarehouse.service;

import com.smartwarehouse.dto.request.LoginRequest;
import com.smartwarehouse.dto.request.RegisterRequest;
import com.smartwarehouse.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
    AuthResponse register(RegisterRequest registerRequest);
}

