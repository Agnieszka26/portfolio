import cn from "classnames";
import styles from "./Navbar.module.scss";
const Hamburger = ({
  handleHamburger,
  open,
}: {
  handleHamburger: () => void;
  open: boolean;
}) => {
  return (
    <div className={styles.hamburger}>
      <button className={styles.menuButton} onClick={handleHamburger}>
        <div className={styles.icon}>
          <span
            className={cn(
              styles.line,
              open ? styles.rotate45 : styles.translateup,
            )}
          ></span>
          <span className={cn(styles.line, open && styles.opacity0)}></span>

          <span
            className={cn(
              styles.line,
              open ? styles.mrotate45 : styles.translatedown,
            )}
          ></span>
        </div>
      </button>
    </div>
  );
};

export default Hamburger;
