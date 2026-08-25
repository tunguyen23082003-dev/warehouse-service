package com.smartwarehouse.service;

import com.smartwarehouse.dto.UserDTO;
import com.smartwarehouse.dto.request.UserCreateRequest;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    UserDTO createUser(UserCreateRequest request);
    UserDTO updateUser(Long id, UserCreateRequest request);
    void deleteUser(Long id);
}

