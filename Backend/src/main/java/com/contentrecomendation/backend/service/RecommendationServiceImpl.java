package com.contentrecomendation.backend.service;

import com.contentrecomendation.backend.model.Interest;
import com.contentrecomendation.backend.model.Recommendation;
import com.contentrecomendation.backend.repository.InterestRepository;
import com.contentrecomendation.backend.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    @Autowired
    private InterestRepository interestRepository;

    @Autowired
    private RecommendationRepository recommendationRepository;



    @Override
    public List<Recommendation> getRecommendationsForUser(Long userId) {
        List<Interest> userInterests = interestRepository.findByUserId(userId);

        if (userInterests.isEmpty()) {
            return List.of(); // return empty list
        }

        List<String> interestNames = userInterests.stream()
                .map(Interest::getCategory)
                .toList();

        return recommendationRepository.findByCategoryIn(interestNames);
    }
}

