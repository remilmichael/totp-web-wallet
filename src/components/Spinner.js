import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <>
      <div className={styles.spinner_container}>
        <div className={styles.lds_spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Spinner;
