import styles from "./Header.module.css";

const Header = () => {
    return (
      <div className={styles["header-wraper"]}>
        <div className={styles["main-info"]}>
          <h1 className={styles["h1-style"]}>Matias Longo Perrig</h1>
        </div>
      </div>
    );
  };
  
export default Header;