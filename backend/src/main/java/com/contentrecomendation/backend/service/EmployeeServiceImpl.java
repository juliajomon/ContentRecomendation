package com.contentrecomendation.backend.service;

import com.contentrecomendation.backend.model.Employee;
import com.contentrecomendation.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository repo;

    @Override
    public List<Employee> getAll() {
        return repo.findAll();
    }

    @Override
    public Employee save(Employee e) {
        return repo.save(e);
    }
}
