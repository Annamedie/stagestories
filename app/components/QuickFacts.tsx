import { Post } from "../types/dataTypes";

interface QuickFactsProps {
  posts: Post[];
}

function QuickFacts({ posts }: QuickFactsProps) {
  return (
    <div className="bg-white">
      <h1>Quick Facts</h1>
      <ul>
        <li>Favorite artist</li>
        <li>IFavorite genre</li>
        <li>{`Number of concerts: ${posts.length}`}</li>
        <li>Most visited city</li>
      </ul>
    </div>
  );
}
export default QuickFacts;
