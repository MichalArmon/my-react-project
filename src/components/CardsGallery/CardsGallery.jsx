import Card from "../Card/Card";
import { usePosts } from "../../context/PostContext.jsx";

export default function CardsGallery() {
  const { posts } = usePosts();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
      {posts.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </div>
  );
}
