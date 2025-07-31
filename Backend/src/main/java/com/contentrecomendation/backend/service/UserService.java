package com.contentrecomendation.backend.service;

import com.contentrecomendation.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> getUserByEmail(String email);
    User loginUser(String email, String password);
    List<User> getAllUsers();
}
