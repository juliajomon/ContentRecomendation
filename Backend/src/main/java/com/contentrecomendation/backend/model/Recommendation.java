package com.contentrecomendation.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Recommendation {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String category;
    private String genre;
    private String suggestionType; // read/watch/etc.

    @ManyToOne
    private User user;
}
