import { Post } from "../types/dataTypes";
interface ConcertCardProps {
  post: Post;
}

function ConcertCard({ post }: ConcertCardProps) {
  return (
    <div key={post.id} className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{post.artistBand}</h2>
        <span className="text-sm text-gray-500">{post.rating}/5</span>
      </div>
      <p className="text-gray-700 mb-2">{post.review}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm">
          {post.venue} - {post.location}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(post.showDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default ConcertCard;
