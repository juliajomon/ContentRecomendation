package com.contentrecomendation.backend.repository;

import com.contentrecomendation.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
}
