package com.contentrecomendation.backend.service;

import com.contentrecomendation.backend.model.User;
import com.contentrecomendation.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public User registerUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

}
