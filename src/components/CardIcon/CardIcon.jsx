import styles from "./CardIcon.module.css";

export default function CardIcon({ title }) {
  if (!title) return null;

  const initial = title.trim().charAt(0).toUpperCase();

  return <div className={styles.icon}> {initial}</div>;
}
