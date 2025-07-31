package com.contentrecomendation.backend.service;

import com.contentrecomendation.backend.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAll();
    Employee save(Employee e);
}
