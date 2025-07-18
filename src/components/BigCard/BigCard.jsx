import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import styles from "./BigCard.module.css";
import Spinner from "../Spinner/Spinner.jsx";

import CardIcon from "../CardIcon/CardIcon.jsx";

function BigCard() {
  const { id } = useParams();
  const { fetchCardById, isLoader, card, error } = usePosts();

  useEffect(() => {
    fetchCardById(id); // רק קוראת לפונקציה פעם אחת
  }, [id]);

  if (isLoader) return <Spinner />;
  if (error) return <p>שגיאה: {error}</p>;
  if (!card) return <p>לא נמצא כרטיס</p>;

  return (
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
  );
}

export default BigCard;
