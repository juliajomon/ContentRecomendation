package com.contentrecomendation.backend.controller;

import com.contentrecomendation.backend.model.Employee;
import com.contentrecomendation.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    @GetMapping("/")
    public List<Employee> getAll() {
        return service.getAll();
    }

    @PostMapping("/")
    public Employee add(@RequestBody Employee e) {
        return service.save(e);
    }
}
