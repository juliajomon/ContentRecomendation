// src/components/RecommendationCard.jsx
function RecommendationCard({ title, type, imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{type}</p>
    </div>
  );
}
export default RecommendationCard;