package com.contentrecomendation.backend.service;

import com.contentrecomendation.backend.model.User;

import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> getUserByEmail(String email);
}
