import styles from "./About.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardGallery from "../../components/CardsGallery/CardsGallery";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <div className={styles.intro}>
        <h1>Welcome to our digital business card service! </h1>
        <p>
          This page showcases a sample of four beautifully designed digital
          business cards. Our platform offers a modern, convenient way to share
          your professional identity online — accessible anytime, anywhere.
        </p>
      </div>
      <Link to={"/"}>
        {" "}
        <CardGallery />
      </Link>
    </div>
  );
}

export default About;
