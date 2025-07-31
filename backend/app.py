# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib # For loading the TF-IDF vectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, crucial for frontend-backend communication

# --- Global variables to store loaded model components ---
tfidf_vectorizer = None
movies_df = None
content_tfidf_matrix = None # This will be generated from movies_df using the loaded vectorizer

# --- Paths to your downloaded model artifacts ---
# Make sure these paths are correct relative to where you run your Flask app
TFIDF_VECTORIZER_PATH = 'tfidf_vectorizer.pkl'
PROCESSED_MOVIES_PATH = 'processed_movies.csv'

# --- Functions for User Profile and Recommendation Generation ---
# These are the same functions you developed and tested in Kaggle

def get_user_profile_vector(user_interests, tfidf_vectorizer, movies_df):
    """
    Generates a user's profile vector based on their expressed interests (genres).
    Args:
        user_interests (list): A list of dictionaries, where each dict
                                represents a user's interest, e.g.,
                                [{"category": "Movies", "genre": "Sci-Fi"},
                                 {"category": "Movies", "genre": "Drama"}]
        tfidf_vectorizer: The fitted TfidfVectorizer.
        movies_df (pd.DataFrame): The DataFrame containing movie metadata.
    Returns:
        np.array: A 1D numpy array representing the user's aggregated preference vector,
                  or None if no matching interests are found.
    """
    user_liked_genres = [interest['genre'] for interest in user_interests if interest['category'] == 'Movies']

    if not user_liked_genres:
        print("No movie genres provided in user interests. Cannot create a specific user profile.")
        return None

    user_interest_string = ' '.join(user_liked_genres)
    user_interest_vector = tfidf_vectorizer.transform([user_interest_string])

    return user_interest_vector

def get_recommendations_ml(user_profile_vector, content_tfidf_matrix, movies_df, category_filter=None, num_recommendations=5):
    """
    Generates movie recommendations based on a user's profile vector using cosine similarity.
    Args:
        user_profile_vector (np.array): The TF-IDF vector representing the user's preferences.
        content_tfidf_matrix: The TF-IDF matrix of all content items.
        movies_df (pd.DataFrame): The DataFrame containing movie metadata.
        category_filter (str, optional): Not strictly used for MovieLens (all are 'Movies'),
                                         but kept for consistency with your frontend. Defaults to None.
        num_recommendations (int): Number of recommendations to return.
    Returns:
        list: A list of dictionaries, each representing a recommended movie.
    """
    if user_profile_vector is None:
        print("User profile is None, returning a random sample of movies.")
        return movies_df.sample(n=num_recommendations).to_dict(orient='records')

    similarity_scores = cosine_similarity(user_profile_vector, content_tfidf_matrix).flatten()
    sorted_indices = similarity_scores.argsort()[::-1]

    recommended_items = []
    seen_movie_ids = set()

    for idx in sorted_indices:
        movie_id = movies_df.iloc[idx]['movieId']
        if movie_id in seen_movie_ids:
            continue

        item = movies_df.iloc[idx].to_dict()

        item_category = 'Movies' # All MovieLens items are movies
        if category_filter and item_category != category_filter:
            continue

        recommended_items.append({
            'id': str(item['movieId']), # Convert to string for consistency with frontend
            'title': item['title'],
            'category': item_category,
            'genre': item['genres'].replace('|', ', '), # Format genres nicely
            'description': f"Genres: {item['genres'].replace('|', ', ')}" # Placeholder description
        })
        seen_movie_ids.add(movie_id)

        if len(recommended_items) >= num_recommendations:
            break

    return recommended_items

# --- API Endpoint ---
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_interests = data.get('userInterests', [])
    category_filter = data.get('categoryFilter', None)

    if tfidf_vectorizer is None or movies_df is None or content_tfidf_matrix is None:
        return jsonify({"error": "Model not loaded. Server might be initializing."}, 500)

    user_profile = get_user_profile_vector(user_interests, tfidf_vectorizer, movies_df)
    recommendations = get_recommendations_ml(user_profile, content_tfidf_matrix, movies_df, category_filter)

    return jsonify({"recommendations": recommendations})

# --- Server Initialization ---
if __name__ == '__main__':
    print("Loading model components...")
    try:
        # Load the TF-IDF vectorizer
        tfidf_vectorizer = joblib.load(TFIDF_VECTORIZER_PATH)
        print(f"TF-IDF vectorizer loaded from {TFIDF_VECTORIZER_PATH}")

        # Load the processed movies DataFrame
        movies_df = pd.read_csv(PROCESSED_MOVIES_PATH)
        print(f"Processed movies data loaded from {PROCESSED_MOVIES_PATH}")

        # Re-generate the content TF-IDF matrix using the loaded vectorizer and movies_df
        # This is more memory-efficient than saving and loading the large sparse matrix
        content_tfidf_matrix = tfidf_vectorizer.transform(movies_df['combined_features'])
        print(f"Content TF-IDF matrix re-generated with shape: {content_tfidf_matrix.shape}")

        print("Model components loaded successfully. Starting Flask app...")
        app.run(debug=True, port=5000) # Run on port 5000
    except FileNotFoundError as e:
        print(f"Error: Model artifact not found. Please ensure '{e.filename}' is in the same directory as app.py.")
        print("Please download 'tfidf_vectorizer.pkl' and 'processed_movies.csv' from your Kaggle notebook's output.")
    except Exception as e:
        print(f"An error occurred during model loading or app startup: {e}")