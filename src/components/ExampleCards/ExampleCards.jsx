import Card from "../Card/Card";
import { usePosts } from "../../context/PostContext.jsx";
// import { useEffect, useState } from "react";

// function getRandomCards(cards, count = 4) {
//   const shuffled = [...cards].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }
export default function ExampleCards() {
  const { posts } = usePosts();
  //
  //   const { posts } = usePosts();
  //   const [randomCards, setRandomCards] = useState([]);

  //   useEffect(() => {
  //     if (posts.length > 0) {
  //       const selected = getRandomCards(posts, 4);
  //       setRandomCards(selected);
  //     }
  //   }, [posts]); // מריץ רק כש-posts משתנה

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
      {posts.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </div>
  );
}
