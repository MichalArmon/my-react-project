import CreateCard from "../../components/CreateCard/CreateCard";
import MyCardsList from "../../components/MycardsList/MycardsList";
import styles from "./Mycards.module.css";

function Mycards() {
  return (
    <div>
      <CreateCard />
      <MyCardsList />
    </div>
  );
}

export default Mycards;
