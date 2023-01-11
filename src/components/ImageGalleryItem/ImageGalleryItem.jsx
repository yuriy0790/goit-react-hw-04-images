import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImg, bigImg, alt, onImgClick }) => (
  <li
    className={styles.ImageGalleryItem}
    onClick={() => onImgClick(bigImg, alt)}
  >
    <img className={styles.ImageGalleryItemImage} src={smallImg} alt={alt} />
  </li>
);
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string,
  bigImg: PropTypes.string,
  alt: PropTypes.string,
  onImgClick: PropTypes.func.isRequired,
};
