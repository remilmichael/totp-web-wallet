import styles from './SmallSpinner.module.css';

function SmallSpinner() {
  return (
    <div className={styles.lds_default}>
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
  );
}

export default SmallSpinner;
