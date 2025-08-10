import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import React from "react";

export default function SearchPosts() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <div className="relative w-12 md:w-32 ">
      <ion-icon
        name="search-outline"
        // style={{ fontSize: "1.2rem" }}
        className="absolute left-[20px] top-1/2 -translate-y-1/2 text-white text-lg pointer-events-none z-10"
      ></ion-icon>
      <input
        className="placeholder:opacity-0 mx-3 w-14 bg-amber-300 rounded-md px-2 md:w-32 py-0.5 sm:pl-8 sm:pr-2 pr-4 placeholder:text-stone-50 md:placeholder:opacity-100 "
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          navigate("/");
        }}
        placeholder="Search posts..."
      />
    </div>
  );
}
