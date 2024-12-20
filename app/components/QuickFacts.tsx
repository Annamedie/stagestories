import { Post } from "../types/dataTypes";

interface QuickFactsProps {
  posts: Post[];
}

function QuickFacts({ posts }: QuickFactsProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white">
        <h2>Quick Facts</h2>
        <p>No data avaliable</p>
      </div>
    );
  }

  const calculateMostFrequent = (items: string[]) => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(counts));
    const mostFrequent = Object.entries(counts)
      .filter(([_, count]) => count === maxCount)
      .map(([item]) => item);
    return {
      mostFrequent,
      maxCount,
    };
  };
  const artists = posts
    .map((post) => post.artistBand || "")
    .filter((item) => item !== "");
  const genres = posts
    .map((post) => post.genre || "")
    .filter((item) => item !== "");
  const cities = posts
    .map((post) => post.location || "")
    .filter((item) => item !== "");

  const favoriteArtist = calculateMostFrequent(artists);
  const favoriteGenre = calculateMostFrequent(genres);
  const mostVisitedCity = calculateMostFrequent(cities);

  const renderFact = (
    result: { mostFrequent: string[]; maxCount: number },
    label: string
  ) => {
    if (result.mostFrequent.length === 0) {
      return `No ${label} data available`;
    } else if (result.mostFrequent.length === 1) {
      return (
        result.mostFrequent[0].charAt(0).toUpperCase() +
        result.mostFrequent[0].slice(1)
      );
    } else {
      return `Data inconclusive for ${label}`;
    }
  };

  return (
    <div className="bg-primary rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Facts</h2>
      <ul
        className="space-y-2"
        aria-label="Quick Facts about the collected data from your concerts."
      >
        <li className="flex items-center">
          <span className="font-medium text-gray-700">Favorite artist:</span>
          <span className="ml-2 text-gray-900">
            {renderFact(favoriteArtist, "artist")}
          </span>
        </li>
        <li className="flex items-center">
          <span className="font-medium text-gray-700">Favorite genre:</span>
          <span className="ml-2 text-gray-900">
            {renderFact(favoriteGenre, "genre")}
          </span>
        </li>
        <li className="flex items-center">
          <span className="font-medium text-gray-700">Number of concerts:</span>
          <span className="ml-2 text-gray-900">{posts.length}</span>
        </li>
        <li className="flex items-center">
          <span className="font-medium text-gray-700">Most visited city:</span>
          <span className="ml-2 text-gray-900">
            {renderFact(mostVisitedCity, "city")}
          </span>
        </li>
      </ul>
    </div>
  );
}
export default QuickFacts;
