import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CardsGallery.module.css";
import { usePosts } from "../../context/PostContext";
import CardIcon from "../CardIcon/CardIcon";
import Slider from "react-slick";

const CardGallery = () => {
  const { posts } = usePosts();
  if (!posts || !Array.isArray(posts)) {
    return <p>טוען כרטיסים...</p>; // או Spinner
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {posts.map((card) => (
        <div key={card._id}>
          <div
            className={`${styles.BigCard} ${styles.imageBackgroundBig}`}
            style={{ backgroundImage: `url(${card.image?.url})` }}
          >
            <div className={styles.cardMain}>
              {/* <img src={backCard} alt="decor" className={styles.decorTopRight} /> */}
              <div className={styles.gridContainer}>
                <div className={styles.businessDetails}>
                  <h1>{card.title.toUpperCase()}</h1>
                  <h3>{card.description}</h3>
                  <div className={styles.infoList}>
                    <div className={styles.infoRow}>
                      <div className={styles.iconContainer}>
                        <ion-icon
                          name="call-outline"
                          style={{ color: "#ffffffff" }}
                        ></ion-icon>
                      </div>
                      <h5>{card.phone}</h5>
                    </div>
                    <div className={styles.infoRow}>
                      <div className={styles.iconContainer}>
                        <ion-icon
                          name="home-outline"
                          style={{ color: "#ffffffff" }}
                        ></ion-icon>
                      </div>
                      <h5>
                        {[
                          card.address?.street,
                          card.address?.number,
                          card.address?.city,
                          card.address?.zip,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </h5>
                    </div>
                    <div className={styles.infoRow}>
                      <div className={styles.iconContainer}>
                        <ion-icon
                          name="globe-outline"
                          style={{ color: "#ffffffff" }}
                        ></ion-icon>
                      </div>
                      <h5>{card.email}</h5>
                    </div>
                  </div>
                </div>

                <div className={styles.sideB}>
                  <div></div>
                  <div
                    className={styles.imageBackground}
                    style={{ backgroundImage: `url(${card.image?.url})` }}
                  ></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.companyIcon}>
                  <CardIcon title={card.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CardGallery;
