import PropTypes from "prop-types";
import styles from "./styles/Button.module.css";

function Button({ text }) {
  return <button className={`${styles.btn} ${styles.title}`}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
