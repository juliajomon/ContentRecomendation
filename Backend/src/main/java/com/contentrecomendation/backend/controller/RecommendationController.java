package com.contentrecomendation.backend.controller;

import com.contentrecomendation.backend.model.Recommendation;
import com.contentrecomendation.backend.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Recommendation>> getRecommendations(@PathVariable Long userId) {
        return ResponseEntity.ok(recommendationService.getRecommendationsForUser(userId));
    }
}
