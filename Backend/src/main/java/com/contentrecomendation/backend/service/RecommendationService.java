package com.contentrecomendation.backend.service;

import com.contentrecomendation.backend.model.Recommendation;

import java.util.List;

public interface RecommendationService {
    List<Recommendation> getRecommendations(Long userId);

    List<Recommendation> getRecommendationsForUser(Long userId);
}
