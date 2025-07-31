package com.contentrecommendation.backend.service; // Keep it in the 'service' package

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

// This DTO is specifically for sending data to the Python ML service.
// Make sure its fields match what the Python Flask app expects in its JSON request body.
// You can define this as a static nested class or in its own file if preferred.
// For simplicity in a hackathon, keeping it here is fine.
public static class UserInterestDto { // Made public static
    public String category;
    public String genre;

    // Constructor
    public UserInterestDto(String category, String genre) {
        this.category = category;
        this.genre = genre;
    }

    // Getters (required for JSON serialization by Spring/Jackson)
    public String getCategory() { return category; }
    public String getGenre() { return genre; }

    // You might also need a no-arg constructor if Spring needs to deserialize it from JSON
    public UserInterestDto() {}
}


@Service // Marks this as a Spring service component
public class MlRecommendationService { // Renamed the class

    private final RestTemplate restTemplate;

    // Injects the URL from application.properties
    @Value("${ml.service.url}")
    private String mlServiceUrl;

    // Spring will automatically inject the RestTemplate bean we defined in AppConfig
    public MlRecommendationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Calls the Python ML service to get personalized content recommendations.
     * @param userInterests A list of user's interests (category and genre).
     * @param categoryFilter An optional filter for the recommendation category (e.g., "Movies").
     * @return A list of recommended items as Maps (JSON-like objects from Python).
     */
    public List<Map<String, Object>> getMlRecommendations(List<UserInterestDto> userInterests, String categoryFilter) {
        // Prepare the request body for the Python service
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("userInterests", userInterests);
        requestBody.put("categoryFilter", categoryFilter);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // Make the HTTP POST request to your Python ML service
            // The Python service returns a list of JSON objects directly.
            // We expect a List.class in Java to map this.
            List<Map<String, Object>> recommendations = restTemplate.postForObject(
                mlServiceUrl,
                entity,
                List.class
            );
            return recommendations;
        } catch (Exception e) {
            System.err.println("Error calling ML service at " + mlServiceUrl + ": " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging
            return List.of(); // Return empty list on error
        }
    }
}