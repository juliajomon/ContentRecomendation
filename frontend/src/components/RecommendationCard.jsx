function RecommendationCard({ title, type, imageUrl }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-4xl">📚</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded-full inline-block">
          {type}
        </p>
      </div>
    </div>
  );
}

export default RecommendationCard;
