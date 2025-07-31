package com.contentrecomendation.backend.controller;

import com.contentrecomendation.backend.model.Recommendation;
import com.contentrecomendation.backend.service.RecommendationService;
import com.contentrecomendation.backend.service.MlRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private MlRecommendationService mlRecommendationService;

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Recommendation>> getRecommendationsByCategoryPath(@PathVariable String category) {
        return ResponseEntity.ok(recommendationService.getRecommendationsByCategory(category));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Recommendation>> getRecommendationsByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(recommendationService.getRecommendationsByGenre(genre));
    }

    @GetMapping("/category/{category}/genre/{genre}")
    public ResponseEntity<List<Recommendation>> getRecommendationsByCategoryAndGenre(
            @PathVariable String category, 
            @PathVariable String genre) {
        return ResponseEntity.ok(recommendationService.getRecommendationsByCategoryAndGenre(category, genre));
    }

    @GetMapping("/ml/category/{category}/genre/{genre}")
    public ResponseEntity<List<Map<String, Object>>> getMlRecommendationsByCategoryAndGenre(
            @PathVariable String category, 
            @PathVariable String genre) {
        List<Map<String, String>> userInterests = List.of(
            Map.of("category", category, "genre", genre)
        );
        
        List<Map<String, Object>> mlRecommendations = mlRecommendationService.getMlRecommendations(userInterests, category);
        return ResponseEntity.ok(mlRecommendations);
    }
}
