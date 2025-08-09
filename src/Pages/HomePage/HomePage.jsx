import ExampleCards from "../../components/ExampleCards/ExampleCards";
import "./Homepage.css";
import Spinner from "../../components/Spinner/Spinner";
import { usePosts } from "../../context/PostContext";
import logo from "../../assets/logoB.svg"; // ודאי שהנתיב תקין

import { useEffect } from "react";

function HomePage() {
  const { setIsLoader, isLoader, isDark } = usePosts();

  useEffect(() => {
    setIsLoader(false);
  }, []);

  if (isLoader) return <Spinner />;
  return (
    <div className="flex flex-col">
      {!isDark ? (
        <img src={logo} alt="Logo" className="homeBackgroundLogo" />
      ) : (
        ""
      )}
      <div className="max-w-[1200px] mx-auto text-center mt-4 ">
        <h1 className="text-2xl mb-2 text-center">
          Welcome to our digital business card service!{" "}
        </h1>
        <p>
          This page showcases a sample of four beautifully designed digital
          business cards. Our platform offers a modern, convenient way to share
          your professional identity online — accessible anytime, anywhere.
        </p>
      </div>
      <ExampleCards />
    </div>
  );
}

export default HomePage;
