import { usePosts } from "../../context/PostContext";
import Card from "../Card/Card";

function MyCardsList() {
  const { posts } = usePosts();
  const user = JSON.parse(localStorage.getItem("user"));

  // אם המשתמש לא מחובר
  if (!user || !user.email) return <p>לא התחברת למערכת</p>;

  // סינון רק כרטיסים שנוצרו על ידי המשתמש הנוכחי
  const myCards = posts.filter((post) => post.email === user.email);

  if (myCards.length === 0) return <p>אין לך כרטיסים עדיין.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
      {myCards.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </div>
  );
}

export default MyCardsList;
