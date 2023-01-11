import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button className={styles.Button} type="button" onClick={() => loadMore()}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
